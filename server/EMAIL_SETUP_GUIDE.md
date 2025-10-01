# 📧 Email Setup Guide for EcoSnap

## Overview

EcoSnap uses **Nodemailer** to send transactional emails for:
- Welcome emails on registration
- Password reset emails
- Report verification notifications
- Work order assignments
- Cleanup completion notifications
- Organization approval emails

---

## 🚀 Quick Setup

### 1. Gmail Setup (Recommended for Development)

#### Step 1: Enable 2-Factor Authentication
1. Go to [Google Account Security](https://myaccount.google.com/security)
2. Enable **2-Step Verification**

#### Step 2: Generate App Password
1. Go to [App Passwords](https://myaccount.google.com/apppasswords)
2. Select **Mail** and **Other (Custom name)**
3. Name it "EcoSnap"
4. Click **Generate**
5. Copy the 16-character password

#### Step 3: Update .env File
```env
# Email Configuration
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_EMAIL=your-email@gmail.com
SMTP_PASSWORD=your-16-char-app-password
FROM_EMAIL=noreply@ecosnap.com
FROM_NAME=EcoSnap
```

---

## 📧 Email Templates Included

### 1. Welcome Email
**Trigger**: User registration  
**Sent to**: New users (citizens & organizations)  
**Content**: Welcome message, quick start guide, CTA button

### 2. Password Reset Email
**Trigger**: Forgot password request  
**Sent to**: User requesting reset  
**Content**: Reset link (expires in 10 minutes), security warning

### 3. Report Verified Email
**Trigger**: Admin verifies a report  
**Sent to**: Citizen who submitted the report  
**Content**: Verification confirmation, points earned, next steps

### 4. Report Assigned Email
**Trigger**: Admin assigns report to organization  
**Sent to**: Organization  
**Content**: Work order details, CTA to view/accept

### 5. Cleanup Completed Email
**Trigger**: Organization marks cleanup as complete  
**Sent to**: Original reporter  
**Content**: Completion notice, verification request, bonus points info

### 6. Organization Approved Email
**Trigger**: Admin approves organization verification  
**Sent to**: Organization  
**Content**: Approval confirmation, getting started guide

---

## 🔧 Alternative SMTP Providers

### SendGrid (Production Recommended)

1. **Sign up**: [SendGrid](https://sendgrid.com/)
2. **Get API Key**: Settings → API Keys
3. **Update .env**:
```env
SMTP_HOST=smtp.sendgrid.net
SMTP_PORT=587
SMTP_EMAIL=apikey
SMTP_PASSWORD=your-sendgrid-api-key
```

### Mailgun

```env
SMTP_HOST=smtp.mailgun.org
SMTP_PORT=587
SMTP_EMAIL=postmaster@your-domain.mailgun.org
SMTP_PASSWORD=your-mailgun-password
```

### AWS SES

```env
SMTP_HOST=email-smtp.us-east-1.amazonaws.com
SMTP_PORT=587
SMTP_EMAIL=your-ses-smtp-username
SMTP_PASSWORD=your-ses-smtp-password
```

### Outlook/Office 365

```env
SMTP_HOST=smtp.office365.com
SMTP_PORT=587
SMTP_EMAIL=your-email@outlook.com
SMTP_PASSWORD=your-password
```

---

## 🧪 Testing Email Functionality

### Test Welcome Email
```bash
# Register a new user
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "password123",
    "userType": "citizen",
    "profile": {
      "firstName": "Test",
      "lastName": "User"
    }
  }'
```

### Test Password Reset Email
```bash
curl -X POST http://localhost:5000/api/auth/forgotpassword \
  -H "Content-Type: application/json" \
  -d '{"email": "test@example.com"}'
```

### Check Server Logs
```bash
# Look for email confirmation messages:
✅ Welcome email sent to test@example.com
✅ Password reset email sent to test@example.com
```

---

## 📝 Email Template Customization

### Location
`/server/src/utils/emailTemplates.js`

### Customize Templates

```javascript
// Example: Modify welcome email
exports.welcomeEmail = (userName) => {
  return {
    subject: 'Your Custom Subject',
    html: `
      <h1>Custom HTML Content</h1>
      <p>Hello ${userName}!</p>
    `,
    message: 'Plain text fallback'
  };
};
```

### Available Variables
- `userName` - User's first name or company name
- `resetUrl` - Password reset URL
- `reportTitle` - Report title
- `points` - Points earned
- `organizationName` - Organization name
- `process.env.CLIENT_URL` - Frontend URL

---

## 🎨 Email Design Guidelines

### Current Design
- **Colors**: Green (#10B981) for primary, Blue (#3B82F6) for info
- **Layout**: Centered, max-width 600px
- **Responsive**: Mobile-friendly HTML
- **CTA Buttons**: Prominent, branded colors
- **Footer**: Unsubscribe info, copyright

### Modify Styles
Edit inline CSS in `/server/src/utils/emailTemplates.js`:
```html
<style>
  .button { 
    background: #10B981; 
    color: white; 
    padding: 12px 30px;
  }
</style>
```

---

## 🔒 Security Best Practices

### 1. Environment Variables
✅ **DO**: Store credentials in `.env`  
❌ **DON'T**: Commit `.env` to git

### 2. App Passwords
✅ **DO**: Use app-specific passwords  
❌ **DON'T**: Use your main account password

### 3. Rate Limiting
✅ **DO**: Limit password reset requests  
❌ **DON'T**: Allow unlimited email sends

### 4. Email Validation
✅ **DO**: Validate email addresses  
❌ **DON'T**: Send to unverified emails

---

## 🐛 Troubleshooting

### Issue: "Error sending email"

**Solution 1**: Check SMTP credentials
```bash
# Test SMTP connection
node -e "require('./server/src/utils/sendEmail')({email:'test@example.com',subject:'Test',message:'Test'})"
```

**Solution 2**: Check firewall/antivirus
- Allow port 587 outbound
- Disable SSL inspection temporarily

**Solution 3**: Check Gmail settings
- Enable "Less secure app access" (if not using app password)
- Check for blocked sign-in attempts

### Issue: "Authentication failed"

**Solution**: Regenerate app password
1. Delete old app password in Google Account
2. Generate new one
3. Update `.env` file
4. Restart server

### Issue: "Connection timeout"

**Solution**: Try different port
```env
# Try port 465 with secure connection
SMTP_PORT=465
```

### Issue: Emails going to spam

**Solution**: 
1. Use a verified domain email
2. Set up SPF/DKIM records
3. Use a reputable SMTP provider (SendGrid, Mailgun)

---

## 📊 Email Monitoring

### Check Email Logs
```bash
# Server logs show email status
✅ Welcome email sent to user@example.com
❌ Error sending email: Connection refused
```

### Add Email Tracking (Optional)

```javascript
// In sendEmail.js
const info = await transporter.sendMail(mailOptions);
console.log('Message ID:', info.messageId);
console.log('Preview URL:', nodemailer.getTestMessageUrl(info));
```

---

## 🚀 Production Deployment

### Recommended Setup

1. **Use SendGrid or Mailgun**
   - Better deliverability
   - Analytics dashboard
   - Higher sending limits

2. **Set up custom domain**
   ```env
   FROM_EMAIL=noreply@yourdomain.com
   FROM_NAME=EcoSnap
   ```

3. **Configure DNS records**
   - SPF record
   - DKIM signature
   - DMARC policy

4. **Monitor email metrics**
   - Delivery rate
   - Open rate
   - Bounce rate
   - Spam complaints

---

## 📚 API Integration

### Send Custom Emails

```javascript
const sendEmail = require('./utils/sendEmail');

await sendEmail({
  email: 'user@example.com',
  subject: 'Custom Subject',
  message: 'Plain text message',
  html: '<h1>HTML content</h1>'
});
```

### Use Notification Service

```javascript
const { notifyReportVerified } = require('./utils/notificationService');

await notifyReportVerified(user, report, points);
```

---

## ✅ Verification Checklist

- [ ] SMTP credentials added to `.env`
- [ ] Gmail app password generated (if using Gmail)
- [ ] Server restarted after `.env` changes
- [ ] Test registration sends welcome email
- [ ] Test password reset sends reset email
- [ ] Check spam folder if emails not received
- [ ] Verify email templates display correctly
- [ ] Test on mobile email clients

---

## 📞 Support

If you encounter issues:
1. Check server logs for error messages
2. Verify SMTP credentials
3. Test with a different email provider
4. Review Nodemailer documentation: [nodemailer.com](https://nodemailer.com/)

---

**Email system is now ready! 📧✅**

Users will receive:
- Welcome emails on signup
- Password reset links
- Report status notifications
- Work order assignments
- Cleanup completion notices
