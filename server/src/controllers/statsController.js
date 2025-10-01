const Report = require('../models/Report');
const User = require('../models/User');
const WorkOrder = require('../models/WorkOrder');

// @desc    Get dashboard statistics
// @route   GET /api/stats/dashboard
// @access  Public
exports.getDashboardStats = async (req, res, next) => {
  try {
    // Total counts
    const totalReports = await Report.countDocuments();
    const totalUsers = await User.countDocuments({ userType: 'citizen' });
    const totalOrganizations = await User.countDocuments({ userType: 'organization' });
    const completedReports = await Report.countDocuments({ status: 'completed' });

    // Reports by status
    const reportsByStatus = await Report.aggregate([
      {
        $group: {
          _id: '$status',
          count: { $sum: 1 }
        }
      }
    ]);

    // Reports by category
    const reportsByCategory = await Report.aggregate([
      {
        $group: {
          _id: '$category',
          count: { $sum: 1 }
        }
      }
    ]);

    // Recent reports
    const recentReports = await Report.find()
      .sort({ createdAt: -1 })
      .limit(5)
      .populate('user', 'email profile.firstName profile.lastName');

    // Success rate
    const successRate = totalReports > 0 
      ? ((completedReports / totalReports) * 100).toFixed(2)
      : 0;

    res.status(200).json({
      success: true,
      data: {
        overview: {
          totalReports,
          totalUsers,
          totalOrganizations,
          completedReports,
          successRate: parseFloat(successRate)
        },
        reportsByStatus: reportsByStatus.reduce((acc, item) => {
          acc[item._id] = item.count;
          return acc;
        }, {}),
        reportsByCategory: reportsByCategory.reduce((acc, item) => {
          acc[item._id] = item.count;
          return acc;
        }, {}),
        recentReports
      }
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get report statistics
// @route   GET /api/stats/reports
// @access  Public
exports.getReportStats = async (req, res, next) => {
  try {
    // Reports over time (last 30 days)
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

    const reportsOverTime = await Report.aggregate([
      {
        $match: {
          createdAt: { $gte: thirtyDaysAgo }
        }
      },
      {
        $group: {
          _id: {
            $dateToString: { format: '%Y-%m-%d', date: '$createdAt' }
          },
          count: { $sum: 1 }
        }
      },
      {
        $sort: { _id: 1 }
      }
    ]);

    // Average resolution time
    const completedReportsWithTime = await Report.find({
      status: 'completed',
      completedAt: { $exists: true }
    });

    let avgResolutionTime = 0;
    if (completedReportsWithTime.length > 0) {
      const totalTime = completedReportsWithTime.reduce((acc, report) => {
        const diff = report.completedAt - report.createdAt;
        return acc + diff;
      }, 0);
      avgResolutionTime = Math.round(totalTime / completedReportsWithTime.length / (1000 * 60 * 60)); // in hours
    }

    // Reports by priority
    const reportsByPriority = await Report.aggregate([
      {
        $group: {
          _id: '$priority',
          count: { $sum: 1 }
        }
      }
    ]);

    // Top reporters
    const topReporters = await Report.aggregate([
      {
        $group: {
          _id: '$user',
          reportCount: { $sum: 1 }
        }
      },
      {
        $sort: { reportCount: -1 }
      },
      {
        $limit: 10
      }
    ]);

    // Populate user details
    await User.populate(topReporters, {
      path: '_id',
      select: 'email profile.firstName profile.lastName citizen.points'
    });

    res.status(200).json({
      success: true,
      data: {
        reportsOverTime,
        avgResolutionTime,
        reportsByPriority: reportsByPriority.reduce((acc, item) => {
          acc[item._id] = item.count;
          return acc;
        }, {}),
        topReporters: topReporters.map(item => ({
          user: item._id,
          reportCount: item.reportCount
        }))
      }
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get user statistics
// @route   GET /api/stats/users
// @access  Private/Admin
exports.getUserStats = async (req, res, next) => {
  try {
    // User growth over time
    const userGrowth = await User.aggregate([
      {
        $group: {
          _id: {
            $dateToString: { format: '%Y-%m', date: '$createdAt' }
          },
          count: { $sum: 1 }
        }
      },
      {
        $sort: { _id: 1 }
      }
    ]);

    // Users by type
    const usersByType = await User.aggregate([
      {
        $group: {
          _id: '$userType',
          count: { $sum: 1 }
        }
      }
    ]);

    // Active users (logged in last 30 days)
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

    const activeUsers = await User.countDocuments({
      lastLogin: { $gte: thirtyDaysAgo }
    });

    // Top point earners
    const topPointEarners = await User.find({ userType: 'citizen' })
      .sort({ 'citizen.points': -1 })
      .limit(10)
      .select('email profile.firstName profile.lastName citizen.points citizen.reportsCount');

    res.status(200).json({
      success: true,
      data: {
        userGrowth,
        usersByType: usersByType.reduce((acc, item) => {
          acc[item._id] = item.count;
          return acc;
        }, {}),
        activeUsers,
        topPointEarners
      }
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get organization statistics
// @route   GET /api/stats/organizations
// @access  Private/Admin
exports.getOrganizationStats = async (req, res, next) => {
  try {
    // Top rated organizations
    const topOrganizations = await User.find({ userType: 'organization' })
      .sort({ 'organization.rating.average': -1 })
      .limit(10)
      .select('organization.companyName organization.rating organization.teamSize');

    // Work orders by status
    const workOrdersByStatus = await WorkOrder.aggregate([
      {
        $group: {
          _id: '$status',
          count: { $sum: 1 }
        }
      }
    ]);

    // Total earnings
    const totalEarnings = await WorkOrder.aggregate([
      {
        $match: { paymentStatus: 'paid' }
      },
      {
        $group: {
          _id: null,
          total: { $sum: '$pricing.totalAmount' }
        }
      }
    ]);

    res.status(200).json({
      success: true,
      data: {
        topOrganizations,
        workOrdersByStatus: workOrdersByStatus.reduce((acc, item) => {
          acc[item._id] = item.count;
          return acc;
        }, {}),
        totalEarnings: totalEarnings.length > 0 ? totalEarnings[0].total : 0
      }
    });
  } catch (error) {
    next(error);
  }
};
