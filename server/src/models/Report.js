const mongoose = require('mongoose');

const reportSchema = new mongoose.Schema({
  // Reporter Info
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'Report must belong to a user']
  },

  // Report Details
  title: {
    type: String,
    required: [true, 'Please add a title'],
    trim: true,
    maxlength: [100, 'Title cannot exceed 100 characters']
  },

  description: {
    type: String,
    required: [true, 'Please add a description'],
    maxlength: [500, 'Description cannot exceed 500 characters']
  },

  category: {
    type: String,
    required: [true, 'Please select a category'],
    enum: [
      'general-waste',
      'recyclables',
      'hazardous-waste',
      'organic-waste',
      'bulk-items',
      'graffiti',
      'illegal-dumping',
      'other'
    ]
  },

  // Location
  location: {
    type: {
      type: String,
      enum: ['Point'],
      default: 'Point'
    },
    coordinates: {
      type: [Number], // [longitude, latitude]
      required: [true, 'Please provide location coordinates']
    },
    address: {
      street: String,
      city: String,
      state: String,
      zipCode: String,
      country: { type: String, default: 'USA' }
    },
    formattedAddress: String
  },

  // Images
  images: [{
    url: {
      type: String,
      required: true
    },
    uploadedAt: {
      type: Date,
      default: Date.now
    }
  }],

  // Status
  status: {
    type: String,
    enum: ['pending', 'verified', 'assigned', 'in-progress', 'completed', 'rejected'],
    default: 'pending'
  },

  priority: {
    type: String,
    enum: ['low', 'medium', 'high', 'urgent'],
    default: 'medium'
  },

  // Verification
  isVerified: {
    type: Boolean,
    default: false
  },

  verifiedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },

  verifiedAt: Date,

  rejectionReason: String,

  // Assignment
  assignedTo: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User' // Organization
  },

  assignedAt: Date,

  // Completion
  completedAt: Date,

  completionImages: [{
    url: String,
    uploadedAt: Date
  }],

  completionNotes: String,

  // Citizen Verification
  citizenVerified: {
    type: Boolean,
    default: false
  },

  citizenVerifiedAt: Date,

  // Points
  pointsAwarded: {
    type: Number,
    default: 0
  },

  // Metadata
  views: {
    type: Number,
    default: 0
  },

  upvotes: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }],

  // Work Order Reference
  workOrder: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'WorkOrder'
  }

}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Indexes
reportSchema.index({ location: '2dsphere' });
reportSchema.index({ user: 1, createdAt: -1 });
reportSchema.index({ status: 1 });
reportSchema.index({ category: 1 });
reportSchema.index({ assignedTo: 1 });

// Virtual for upvote count
reportSchema.virtual('upvoteCount').get(function() {
  return this.upvotes ? this.upvotes.length : 0;
});

// Award points when report is verified
reportSchema.pre('save', async function(next) {
  if (this.isModified('isVerified') && this.isVerified && this.pointsAwarded === 0) {
    this.pointsAwarded = 10; // Base points for verified report
    
    // Update user points
    const User = mongoose.model('User');
    await User.findByIdAndUpdate(this.user, {
      $inc: { 'citizen.points': 10, 'citizen.reportsCount': 1 }
    });
  }
  next();
});

// Award additional points when citizen verifies completion
reportSchema.pre('save', async function(next) {
  if (this.isModified('citizenVerified') && this.citizenVerified) {
    const additionalPoints = 5;
    this.pointsAwarded += additionalPoints;
    
    // Update user points
    const User = mongoose.model('User');
    await User.findByIdAndUpdate(this.user, {
      $inc: { 'citizen.points': additionalPoints, 'citizen.cleanupVerifications': 1 }
    });
  }
  next();
});

module.exports = mongoose.model('Report', reportSchema);
