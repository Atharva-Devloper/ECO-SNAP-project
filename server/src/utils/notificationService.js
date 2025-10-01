const sendEmail = require('./sendEmail');
const {
  reportVerifiedEmail,
  reportAssignedEmail,
  cleanupCompletedEmail,
  organizationApprovedEmail
} = require('./emailTemplates');

// Send report verified notification
exports.notifyReportVerified = async (user, report, points) => {
  try {
    const userName = user.profile?.firstName || user.email;
    const emailContent = reportVerifiedEmail(userName, report.title, points);
    
    await sendEmail({
      email: user.email,
      subject: emailContent.subject,
      message: emailContent.message,
      html: emailContent.html
    });
    
    console.log(`✅ Verification email sent to ${user.email}`);
  } catch (error) {
    console.error('Error sending verification email:', error);
  }
};

// Send report assigned notification
exports.notifyReportAssigned = async (organization, report) => {
  try {
    const orgName = organization.organization?.companyName || organization.email;
    const emailContent = reportAssignedEmail(orgName, report.title, report._id);
    
    await sendEmail({
      email: organization.email,
      subject: emailContent.subject,
      message: emailContent.message,
      html: emailContent.html
    });
    
    console.log(`📋 Assignment email sent to ${organization.email}`);
  } catch (error) {
    console.error('Error sending assignment email:', error);
  }
};

// Send cleanup completed notification
exports.notifyCleanupCompleted = async (user, report) => {
  try {
    const userName = user.profile?.firstName || user.email;
    const emailContent = cleanupCompletedEmail(userName, report.title);
    
    await sendEmail({
      email: user.email,
      subject: emailContent.subject,
      message: emailContent.message,
      html: emailContent.html
    });
    
    console.log(`🎉 Completion email sent to ${user.email}`);
  } catch (error) {
    console.error('Error sending completion email:', error);
  }
};

// Send organization approved notification
exports.notifyOrganizationApproved = async (organization) => {
  try {
    const orgName = organization.organization?.companyName || organization.email;
    const emailContent = organizationApprovedEmail(orgName);
    
    await sendEmail({
      email: organization.email,
      subject: emailContent.subject,
      message: emailContent.message,
      html: emailContent.html
    });
    
    console.log(`✅ Approval email sent to ${organization.email}`);
  } catch (error) {
    console.error('Error sending approval email:', error);
  }
};
