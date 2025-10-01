const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');

const userSchema = new mongoose.Schema({
  // Basic Info
  email: {
    type: String,
    required: [true, 'Please add an email'],
    unique: true,
    lowercase: true,
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      'Please add a valid email'
    ]
  },
  
  password: {
    type: String,
    required: [true, 'Please add a password'],
    minlength: 6,
    select: false
  },
  
  userType: {
    type: String,
    enum: ['citizen', 'organization', 'admin'],
    default: 'citizen',
    required: true
  },
  
  // Profile Info
  profile: {
    firstName: {
      type: String,
      required: function() { return this.userType === 'citizen'; },
      trim: true
    },
    
    lastName: {
      type: String,
      required: function() { return this.userType === 'citizen'; },
      trim: true
    },
    
    phone: {
      type: String,
      trim: true
    },
    
    avatar: {
      type: String, // URL to profile image
      default: null
    },
    
    bio: {
      type: String,
      maxlength: [500, 'Bio cannot exceed 500 characters']
    }
  },
  
  // Organization-specific fields
  organization: {
    companyName: {
      type: String,
      required: function() { return this.userType === 'organization'; },
      trim: true
    },
    
    businessLicense: {
      type: String,
      required: function() { return this.userType === 'organization'; }
    },
    
    insuranceInfo: {
      provider: String,
      policyNumber: String,
      expirationDate: Date,
      coverageAmount: Number
    },
    
    serviceAreas: [{
      city: String,
      state: String,
      zipCodes: [String],
      radius: Number // in kilometers
    }],
    
    capabilities: [{
      type: String,
      enum: [
        'general-cleanup',
        'hazardous-waste',
        'bulk-items',
        'graffiti-removal',
        'landscaping',
        'emergency-response'
      ]
    }],
    
    teamSize: {
      type: Number,
      min: 1,
      default: 1
    },
    
    equipment: [String],
    
    workingHours: {
      monday: { start: String, end: String, available: { type: Boolean, default: true } },
      tuesday: { start: String, end: String, available: { type: Boolean, default: true } },
      wednesday: { start: String, end: String, available: { type: Boolean, default: true } },
      thursday: { start: String, end: String, available: { type: Boolean, default: true } },
      friday: { start: String, end: String, available: { type: Boolean, default: true } },
      saturday: { start: String, end: String, available: { type: Boolean, default: false } },
      sunday: { start: String, end: String, available: { type: Boolean, default: false } }
    },
    
    pricing: {
      baseRate: { type: Number, default: 25 },
      hourlyRate: { type: Number, default: 50 },
      emergencyMultiplier: { type: Number, default: 2 }
    },
    
    rating: {
      average: { type: Number, default: 0, min: 0, max: 5 },
      totalReviews: { type: Number, default: 0 }
    },
    
    verification: {
      status: {
        type: String,
        enum: ['pending', 'verified', 'rejected', 'suspended'],
        default: 'pending'
      },
      verifiedAt: Date,
      documents: [{
        type: String,
        url: String,
        uploadedAt: { type: Date, default: Date.now }
      }]
    },
    
    subscription: {
      plan: {
        type: String,
        enum: ['trial', 'basic', 'premium'],
        default: 'trial'
      },
      status: {
        type: String,
        enum: ['active', 'cancelled', 'expired'],
        default: 'active'
      },
      startDate: { type: Date, default: Date.now },
      endDate: Date,
      paymentMethod: String
    }
  },
  
  // Citizen-specific fields
  citizen: {
    points: { type: Number, default: 0 },
    level: { type: Number, default: 1 },
    badges: [String],
    reportsCount: { type: Number, default: 0 },
    cleanupVerifications: { type: Number, default: 0 },
    
    preferences: {
      notifications: {
        email: { type: Boolean, default: true },
        push: { type: Boolean, default: true },
        sms: { type: Boolean, default: false }
      },
      radius: { type: Number, default: 5 }, // notification radius in km
      categories: [String] // interested waste categories
    }
  },
  
  // Location
  location: {
    address: {
      street: String,
      city: String,
      state: String,
      zipCode: String,
      country: { type: String, default: 'USA' }
    },
    coordinates: {
      type: {
        type: String,
        enum: ['Point'],
        default: 'Point'
      },
      coordinates: {
        type: [Number], // [longitude, latitude]
        default: [0, 0]
      }
    }
  },
  
  // Account Status
  isActive: { type: Boolean, default: true },
  isEmailVerified: { type: Boolean, default: false },
  
  // Timestamps
  lastLogin: Date,
  
  // Password Reset
  resetPasswordToken: String,
  resetPasswordExpire: Date,
  
  // Email Verification
  emailVerificationToken: String,
  emailVerificationExpire: Date

}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Indexes
userSchema.index({ email: 1 });
userSchema.index({ userType: 1 });
userSchema.index({ 'location.coordinates': '2dsphere' });
userSchema.index({ 'organization.serviceAreas.city': 1 });
userSchema.index({ 'organization.verification.status': 1 });

// Virtual for full name (citizens)
userSchema.virtual('fullName').get(function() {
  if (this.userType === 'citizen' && this.profile.firstName && this.profile.lastName) {
    return `${this.profile.firstName} ${this.profile.lastName}`;
  }
  return this.organization?.companyName || 'Unknown User';
});

// Virtual for display name
userSchema.virtual('displayName').get(function() {
  if (this.userType === 'organization') {
    return this.organization.companyName;
  }
  return this.fullName || this.email;
});

// Hash password before saving
userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) {
    next();
  }
  
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// Match password method
userSchema.methods.matchPassword = async function(enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

// Generate JWT Token
userSchema.methods.getSignedJwtToken = function() {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE
  });
};

// Generate email verification token
userSchema.methods.getEmailVerificationToken = function() {
  const crypto = require('crypto');
  const verificationToken = crypto.randomBytes(20).toString('hex');
  
  this.emailVerificationToken = crypto
    .createHash('sha256')
    .update(verificationToken)
    .digest('hex');
    
  this.emailVerificationExpire = Date.now() + 24 * 60 * 60 * 1000; // 24 hours
  
  return verificationToken;
};

// Generate password reset token
userSchema.methods.getResetPasswordToken = function() {
  const crypto = require('crypto');
  const resetToken = crypto.randomBytes(20).toString('hex');
  
  this.resetPasswordToken = crypto
    .createHash('sha256')
    .update(resetToken)
    .digest('hex');
    
  this.resetPasswordExpire = Date.now() + 10 * 60 * 1000; // 10 minutes
  
  return resetToken;
};

module.exports = mongoose.model('User', userSchema);
