// Email templates for various notifications

// Welcome email for new users
exports.welcomeEmail = (userName) => {
  return {
    subject: 'Welcome to EcoSnap! 🌍',
    html: `
      <!DOCTYPE html>
      <html>
      <head>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: #10B981; color: white; padding: 20px; text-align: center; border-radius: 8px 8px 0 0; }
          .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 8px 8px; }
          .button { display: inline-block; background: #10B981; color: white; padding: 12px 30px; text-decoration: none; border-radius: 5px; margin: 20px 0; }
          .footer { text-align: center; margin-top: 20px; color: #666; font-size: 12px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>🌍 Welcome to EcoSnap!</h1>
          </div>
          <div class="content">
            <h2>Hi ${userName}! 👋</h2>
            <p>Thank you for joining EcoSnap - together we're making our communities cleaner!</p>
            
            <h3>What you can do:</h3>
            <ul>
              <li>📸 Report waste issues with photos</li>
              <li>🗺️ View reports on interactive maps</li>
              <li>🏆 Earn points for verified reports</li>
              <li>📊 Track your impact on the community</li>
            </ul>
            
            <p>Ready to make a difference?</p>
            <a href="${process.env.CLIENT_URL}/citizen/report" class="button">Report Your First Issue</a>
            
            <p>If you have any questions, feel free to reach out to our support team.</p>
            
            <p>Happy reporting! 🌱</p>
            <p><strong>The EcoSnap Team</strong></p>
          </div>
          <div class="footer">
            <p>© 2025 EcoSnap. All rights reserved.</p>
            <p>You're receiving this email because you signed up for EcoSnap.</p>
          </div>
        </div>
      </body>
      </html>
    `,
    message: `Hi ${userName}! Welcome to EcoSnap. Start reporting waste issues and earn points for making your community cleaner!`
  };
};

// Password reset email
exports.resetPasswordEmail = (resetUrl, userName) => {
  return {
    subject: 'Password Reset Request - EcoSnap',
    html: `
      <!DOCTYPE html>
      <html>
      <head>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: #10B981; color: white; padding: 20px; text-align: center; border-radius: 8px 8px 0 0; }
          .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 8px 8px; }
          .button { display: inline-block; background: #10B981; color: white; padding: 12px 30px; text-decoration: none; border-radius: 5px; margin: 20px 0; }
          .warning { background: #FEF3C7; border-left: 4px solid #F59E0B; padding: 15px; margin: 20px 0; }
          .footer { text-align: center; margin-top: 20px; color: #666; font-size: 12px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>🔒 Password Reset Request</h1>
          </div>
          <div class="content">
            <h2>Hi ${userName},</h2>
            <p>You requested to reset your password for your EcoSnap account.</p>
            
            <p>Click the button below to reset your password:</p>
            <a href="${resetUrl}" class="button">Reset Password</a>
            
            <p>Or copy and paste this link into your browser:</p>
            <p style="word-break: break-all; color: #10B981;">${resetUrl}</p>
            
            <div class="warning">
              <strong>⚠️ Important:</strong>
              <ul>
                <li>This link will expire in 10 minutes</li>
                <li>If you didn't request this, please ignore this email</li>
                <li>Your password won't change until you create a new one</li>
              </ul>
            </div>
            
            <p>If you're having trouble, contact our support team.</p>
            
            <p>Best regards,<br><strong>The EcoSnap Team</strong></p>
          </div>
          <div class="footer">
            <p>© 2025 EcoSnap. All rights reserved.</p>
          </div>
        </div>
      </body>
      </html>
    `,
    message: `Hi ${userName}, You requested a password reset. Please visit: ${resetUrl} (expires in 10 minutes)`
  };
};

// Report verified notification
exports.reportVerifiedEmail = (userName, reportTitle, points) => {
  return {
    subject: '✅ Your Report Has Been Verified!',
    html: `
      <!DOCTYPE html>
      <html>
      <head>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: #10B981; color: white; padding: 20px; text-align: center; border-radius: 8px 8px 0 0; }
          .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 8px 8px; }
          .points-badge { background: #10B981; color: white; padding: 10px 20px; border-radius: 50px; display: inline-block; font-size: 18px; font-weight: bold; margin: 20px 0; }
          .button { display: inline-block; background: #10B981; color: white; padding: 12px 30px; text-decoration: none; border-radius: 5px; margin: 20px 0; }
          .footer { text-align: center; margin-top: 20px; color: #666; font-size: 12px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>✅ Report Verified!</h1>
          </div>
          <div class="content">
            <h2>Great news, ${userName}! 🎉</h2>
            <p>Your report "<strong>${reportTitle}</strong>" has been verified by our admin team.</p>
            
            <div style="text-align: center;">
              <div class="points-badge">🏆 +${points} Points Earned!</div>
            </div>
            
            <p>Your report is now visible to cleaning organizations in your area. You'll be notified when it's assigned and completed.</p>
            
            <h3>What happens next?</h3>
            <ul>
              <li>🏢 Organizations will be notified</li>
              <li>📋 A work order will be created</li>
              <li>👷 Cleanup team will be assigned</li>
              <li>✅ You'll verify the cleanup</li>
              <li>🏆 Earn bonus points!</li>
            </ul>
            
            <a href="${process.env.CLIENT_URL}/citizen/reports" class="button">View Your Reports</a>
            
            <p>Thank you for making your community cleaner! 🌱</p>
            <p><strong>The EcoSnap Team</strong></p>
          </div>
          <div class="footer">
            <p>© 2025 EcoSnap. All rights reserved.</p>
          </div>
        </div>
      </body>
      </html>
    `,
    message: `Hi ${userName}, Your report "${reportTitle}" has been verified! You earned ${points} points. Thank you for making a difference!`
  };
};

// Report assigned to organization
exports.reportAssignedEmail = (organizationName, reportTitle, reportId) => {
  return {
    subject: '📋 New Work Order Assigned',
    html: `
      <!DOCTYPE html>
      <html>
      <head>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: #3B82F6; color: white; padding: 20px; text-align: center; border-radius: 8px 8px 0 0; }
          .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 8px 8px; }
          .button { display: inline-block; background: #3B82F6; color: white; padding: 12px 30px; text-decoration: none; border-radius: 5px; margin: 20px 0; }
          .info-box { background: white; border: 2px solid #3B82F6; padding: 15px; border-radius: 8px; margin: 20px 0; }
          .footer { text-align: center; margin-top: 20px; color: #666; font-size: 12px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>📋 New Work Order</h1>
          </div>
          <div class="content">
            <h2>Hi ${organizationName}!</h2>
            <p>You have been assigned a new cleanup work order.</p>
            
            <div class="info-box">
              <h3>📝 Work Order Details</h3>
              <p><strong>Report:</strong> ${reportTitle}</p>
              <p><strong>Status:</strong> Assigned</p>
              <p><strong>Priority:</strong> Review in dashboard</p>
            </div>
            
            <p>Please review the work order details and accept or decline the assignment.</p>
            
            <a href="${process.env.CLIENT_URL}/organization/work-orders" class="button">View Work Order</a>
            
            <p>Best regards,<br><strong>The EcoSnap Team</strong></p>
          </div>
          <div class="footer">
            <p>© 2025 EcoSnap. All rights reserved.</p>
          </div>
        </div>
      </body>
      </html>
    `,
    message: `Hi ${organizationName}, You have been assigned a new work order: "${reportTitle}". Please review and accept in your dashboard.`
  };
};

// Cleanup completed notification
exports.cleanupCompletedEmail = (userName, reportTitle) => {
  return {
    subject: '🎉 Cleanup Completed - Please Verify',
    html: `
      <!DOCTYPE html>
      <html>
      <head>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: #10B981; color: white; padding: 20px; text-align: center; border-radius: 8px 8px 0 0; }
          .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 8px 8px; }
          .button { display: inline-block; background: #10B981; color: white; padding: 12px 30px; text-decoration: none; border-radius: 5px; margin: 20px 0; }
          .highlight { background: #D1FAE5; border-left: 4px solid #10B981; padding: 15px; margin: 20px 0; }
          .footer { text-align: center; margin-top: 20px; color: #666; font-size: 12px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>🎉 Cleanup Completed!</h1>
          </div>
          <div class="content">
            <h2>Great news, ${userName}!</h2>
            <p>The cleanup for your report "<strong>${reportTitle}</strong>" has been completed by our cleaning team.</p>
            
            <div class="highlight">
              <strong>🏆 Earn Bonus Points!</strong>
              <p>Verify the cleanup to earn +5 bonus points and help us maintain quality standards.</p>
            </div>
            
            <h3>What to do next:</h3>
            <ol>
              <li>Visit the location to check the cleanup</li>
              <li>Review the before/after photos</li>
              <li>Verify or report any issues</li>
              <li>Rate the cleaning organization</li>
            </ol>
            
            <a href="${process.env.CLIENT_URL}/citizen/reports" class="button">Verify Cleanup</a>
            
            <p>Thank you for helping keep our community clean! 🌱</p>
            <p><strong>The EcoSnap Team</strong></p>
          </div>
          <div class="footer">
            <p>© 2025 EcoSnap. All rights reserved.</p>
          </div>
        </div>
      </body>
      </html>
    `,
    message: `Hi ${userName}, The cleanup for "${reportTitle}" is complete! Verify it to earn +5 bonus points.`
  };
};

// Organization verification approved
exports.organizationApprovedEmail = (organizationName) => {
  return {
    subject: '✅ Your Organization Has Been Approved!',
    html: `
      <!DOCTYPE html>
      <html>
      <head>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: #10B981; color: white; padding: 20px; text-align: center; border-radius: 8px 8px 0 0; }
          .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 8px 8px; }
          .button { display: inline-block; background: #10B981; color: white; padding: 12px 30px; text-decoration: none; border-radius: 5px; margin: 20px 0; }
          .success-box { background: #D1FAE5; border: 2px solid #10B981; padding: 20px; border-radius: 8px; margin: 20px 0; text-align: center; }
          .footer { text-align: center; margin-top: 20px; color: #666; font-size: 12px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>✅ Congratulations!</h1>
          </div>
          <div class="content">
            <h2>Welcome to EcoSnap, ${organizationName}! 🎉</h2>
            
            <div class="success-box">
              <h3 style="color: #10B981; margin: 0;">Your organization has been verified and approved!</h3>
            </div>
            
            <p>You can now start receiving work orders and earning from cleanup services.</p>
            
            <h3>Get Started:</h3>
            <ul>
              <li>📋 View available work orders</li>
              <li>👷 Assign tasks to your team</li>
              <li>💰 Track your earnings</li>
              <li>⭐ Build your reputation</li>
            </ul>
            
            <a href="${process.env.CLIENT_URL}/organization/dashboard" class="button">Go to Dashboard</a>
            
            <p>We're excited to have you on board! Let's make our communities cleaner together.</p>
            
            <p>Best regards,<br><strong>The EcoSnap Team</strong></p>
          </div>
          <div class="footer">
            <p>© 2025 EcoSnap. All rights reserved.</p>
          </div>
        </div>
      </body>
      </html>
    `,
    message: `Congratulations ${organizationName}! Your organization has been approved. Start receiving work orders now!`
  };
};
