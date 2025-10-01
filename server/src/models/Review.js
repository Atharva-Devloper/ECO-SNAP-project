const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
  // Work Order Reference
  workOrder: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'WorkOrder',
    required: true
  },

  // Organization being reviewed
  organization: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },

  // Reviewer (Citizen or Admin)
  reviewer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },

  // Rating
  rating: {
    type: Number,
    required: [true, 'Please provide a rating'],
    min: 1,
    max: 5
  },

  // Review Details
  title: {
    type: String,
    trim: true,
    maxlength: [100, 'Title cannot exceed 100 characters']
  },

  comment: {
    type: String,
    required: [true, 'Please provide a review comment'],
    maxlength: [500, 'Comment cannot exceed 500 characters']
  },

  // Specific Ratings
  ratings: {
    quality: {
      type: Number,
      min: 1,
      max: 5
    },
    timeliness: {
      type: Number,
      min: 1,
      max: 5
    },
    professionalism: {
      type: Number,
      min: 1,
      max: 5
    },
    communication: {
      type: Number,
      min: 1,
      max: 5
    }
  },

  // Images
  images: [{
    url: String,
    uploadedAt: Date
  }],

  // Response from Organization
  response: {
    comment: String,
    respondedAt: Date
  },

  // Helpful votes
  helpfulVotes: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }],

  // Moderation
  isVerified: {
    type: Boolean,
    default: false
  },

  isFlagged: {
    type: Boolean,
    default: false
  },

  flagReason: String

}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Indexes
reviewSchema.index({ organization: 1, createdAt: -1 });
reviewSchema.index({ workOrder: 1 });
reviewSchema.index({ reviewer: 1 });
reviewSchema.index({ rating: 1 });

// Virtual for helpful vote count
reviewSchema.virtual('helpfulCount').get(function() {
  return this.helpfulVotes ? this.helpfulVotes.length : 0;
});

// Update organization rating after review is saved
reviewSchema.post('save', async function() {
  const User = mongoose.model('User');
  
  // Calculate average rating for organization
  const stats = await this.constructor.aggregate([
    {
      $match: { organization: this.organization }
    },
    {
      $group: {
        _id: '$organization',
        averageRating: { $avg: '$rating' },
        totalReviews: { $sum: 1 }
      }
    }
  ]);

  if (stats.length > 0) {
    await User.findByIdAndUpdate(this.organization, {
      'organization.rating.average': stats[0].averageRating,
      'organization.rating.totalReviews': stats[0].totalReviews
    });
  }
});

// Prevent multiple reviews for same work order
reviewSchema.index({ workOrder: 1, reviewer: 1 }, { unique: true });

module.exports = mongoose.model('Review', reviewSchema);
