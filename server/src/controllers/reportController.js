const Report = require('../models/Report');
const User = require('../models/User');

// @desc    Get all reports
// @route   GET /api/reports
// @access  Public
exports.getReports = async (req, res, next) => {
  try {
    // Build query
    let query = {};

    // Filter by status
    if (req.query.status) {
      query.status = req.query.status;
    }

    // Filter by category
    if (req.query.category) {
      query.category = req.query.category;
    }

    // Filter by user (if provided)
    if (req.query.user) {
      query.user = req.query.user;
    }

    // Filter by location (within radius)
    if (req.query.latitude && req.query.longitude) {
      const radius = req.query.radius || 10; // km
      query.location = {
        $geoWithin: {
          $centerSphere: [
            [parseFloat(req.query.longitude), parseFloat(req.query.latitude)],
            radius / 6378.1 // Earth radius in km
          ]
        }
      };
    }

    // Pagination
    const page = parseInt(req.query.page, 10) || 1;
    const limit = parseInt(req.query.limit, 10) || 20;
    const startIndex = (page - 1) * limit;

    // Execute query
    const reports = await Report.find(query)
      .populate('user', 'email profile.firstName profile.lastName')
      .populate('assignedTo', 'organization.companyName')
      .sort({ createdAt: -1 })
      .skip(startIndex)
      .limit(limit);

    // Get total count
    const total = await Report.countDocuments(query);

    res.status(200).json({
      success: true,
      count: reports.length,
      total,
      page,
      pages: Math.ceil(total / limit),
      data: reports
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get single report
// @route   GET /api/reports/:id
// @access  Public
exports.getReport = async (req, res, next) => {
  try {
    const report = await Report.findById(req.params.id)
      .populate('user', 'email profile.firstName profile.lastName')
      .populate('assignedTo', 'organization.companyName organization.rating')
      .populate('verifiedBy', 'email profile.firstName profile.lastName')
      .populate('workOrder');

    if (!report) {
      return res.status(404).json({
        success: false,
        message: 'Report not found'
      });
    }

    // Increment views
    report.views += 1;
    await report.save({ validateBeforeSave: false });

    res.status(200).json({
      success: true,
      data: report
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Create new report
// @route   POST /api/reports
// @access  Private (Citizen)
exports.createReport = async (req, res, next) => {
  try {
    // Add user to request body
    req.body.user = req.user.id;

    // Add images from processed files
    if (req.processedFiles) {
      req.body.images = req.processedFiles.map(file => ({
        url: file.path
      }));
    } else if (req.processedFile) {
      req.body.images = [{ url: req.processedFile.path }];
    }

    const report = await Report.create(req.body);

    res.status(201).json({
      success: true,
      message: 'Report created successfully',
      data: report
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Update report
// @route   PUT /api/reports/:id
// @access  Private
exports.updateReport = async (req, res, next) => {
  try {
    let report = await Report.findById(req.params.id);

    if (!report) {
      return res.status(404).json({
        success: false,
        message: 'Report not found'
      });
    }

    // Check ownership or admin
    if (report.user.toString() !== req.user.id && req.user.userType !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to update this report'
      });
    }

    report = await Report.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });

    res.status(200).json({
      success: true,
      message: 'Report updated successfully',
      data: report
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete report
// @route   DELETE /api/reports/:id
// @access  Private
exports.deleteReport = async (req, res, next) => {
  try {
    const report = await Report.findById(req.params.id);

    if (!report) {
      return res.status(404).json({
        success: false,
        message: 'Report not found'
      });
    }

    // Check ownership or admin
    if (report.user.toString() !== req.user.id && req.user.userType !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to delete this report'
      });
    }

    await report.deleteOne();

    res.status(200).json({
      success: true,
      message: 'Report deleted successfully',
      data: {}
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Verify report (Admin only)
// @route   PUT /api/reports/:id/verify
// @access  Private/Admin
exports.verifyReport = async (req, res, next) => {
  try {
    const report = await Report.findById(req.params.id);

    if (!report) {
      return res.status(404).json({
        success: false,
        message: 'Report not found'
      });
    }

    report.isVerified = true;
    report.verifiedBy = req.user.id;
    report.verifiedAt = Date.now();
    report.status = 'verified';

    await report.save();

    res.status(200).json({
      success: true,
      message: 'Report verified successfully',
      data: report
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Assign report to organization
// @route   PUT /api/reports/:id/assign
// @access  Private/Admin
exports.assignReport = async (req, res, next) => {
  try {
    const report = await Report.findById(req.params.id);

    if (!report) {
      return res.status(404).json({
        success: false,
        message: 'Report not found'
      });
    }

    // Verify organization exists
    const organization = await User.findById(req.body.organizationId);
    if (!organization || organization.userType !== 'organization') {
      return res.status(400).json({
        success: false,
        message: 'Invalid organization'
      });
    }

    report.assignedTo = req.body.organizationId;
    report.assignedAt = Date.now();
    report.status = 'assigned';

    await report.save();

    res.status(200).json({
      success: true,
      message: 'Report assigned successfully',
      data: report
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Upvote report
// @route   PUT /api/reports/:id/upvote
// @access  Private
exports.upvoteReport = async (req, res, next) => {
  try {
    const report = await Report.findById(req.params.id);

    if (!report) {
      return res.status(404).json({
        success: false,
        message: 'Report not found'
      });
    }

    // Check if already upvoted
    const index = report.upvotes.indexOf(req.user.id);

    if (index > -1) {
      // Remove upvote
      report.upvotes.splice(index, 1);
    } else {
      // Add upvote
      report.upvotes.push(req.user.id);
    }

    await report.save({ validateBeforeSave: false });

    res.status(200).json({
      success: true,
      data: {
        upvoted: index === -1,
        upvoteCount: report.upvotes.length
      }
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get reports by user
// @route   GET /api/reports/user/:userId
// @access  Public
exports.getUserReports = async (req, res, next) => {
  try {
    const reports = await Report.find({ user: req.params.userId })
      .sort({ createdAt: -1 })
      .populate('assignedTo', 'organization.companyName');

    res.status(200).json({
      success: true,
      count: reports.length,
      data: reports
    });
  } catch (error) {
    next(error);
  }
};
