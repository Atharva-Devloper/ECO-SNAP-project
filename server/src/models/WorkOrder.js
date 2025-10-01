const mongoose = require('mongoose');

const workOrderSchema = new mongoose.Schema({
  // Reference to Report
  report: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Report',
    required: [true, 'Work order must be linked to a report']
  },

  // Organization
  organization: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'Work order must be assigned to an organization']
  },

  // Work Order Details
  orderNumber: {
    type: String,
    unique: true
  },

  title: {
    type: String,
    required: true
  },

  description: String,

  category: {
    type: String,
    required: true
  },

  // Status
  status: {
    type: String,
    enum: ['pending', 'accepted', 'in-progress', 'completed', 'cancelled'],
    default: 'pending'
  },

  priority: {
    type: String,
    enum: ['low', 'medium', 'high', 'urgent'],
    default: 'medium'
  },

  // Scheduling
  scheduledDate: Date,
  
  estimatedDuration: {
    type: Number, // in hours
    default: 2
  },

  // Team Assignment
  assignedTeam: {
    teamName: String,
    members: [{
      name: String,
      role: String
    }]
  },

  // Timing
  acceptedAt: Date,
  startedAt: Date,
  completedAt: Date,

  // Completion Details
  completionNotes: String,
  
  completionImages: [{
    url: String,
    uploadedAt: Date
  }],

  actualDuration: Number, // in hours

  // Payment
  pricing: {
    baseRate: {
      type: Number,
      default: 0
    },
    hourlyRate: {
      type: Number,
      default: 0
    },
    additionalCosts: {
      type: Number,
      default: 0
    },
    totalAmount: {
      type: Number,
      default: 0
    }
  },

  paymentStatus: {
    type: String,
    enum: ['pending', 'processing', 'paid', 'failed'],
    default: 'pending'
  },

  paidAt: Date,

  // Rating & Review
  rating: {
    type: Number,
    min: 1,
    max: 5
  },

  review: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Review'
  },

  // Cancellation
  cancellationReason: String,
  cancelledBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  cancelledAt: Date

}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Generate unique order number
workOrderSchema.pre('save', async function(next) {
  if (!this.orderNumber) {
    const count = await mongoose.model('WorkOrder').countDocuments();
    this.orderNumber = `WO-${Date.now()}-${count + 1}`;
  }
  next();
});

// Calculate total amount
workOrderSchema.pre('save', function(next) {
  if (this.pricing.baseRate || this.pricing.hourlyRate) {
    const hourlyTotal = this.pricing.hourlyRate * (this.actualDuration || this.estimatedDuration);
    this.pricing.totalAmount = this.pricing.baseRate + hourlyTotal + this.pricing.additionalCosts;
  }
  next();
});

// Indexes
workOrderSchema.index({ organization: 1, status: 1 });
workOrderSchema.index({ report: 1 });
workOrderSchema.index({ orderNumber: 1 });
workOrderSchema.index({ createdAt: -1 });

module.exports = mongoose.model('WorkOrder', workOrderSchema);
