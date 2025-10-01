const mongoose = require('mongoose');
const User = require('../models/User');
require('dotenv').config();

const seedUsers = async () => {
  try {
    // Connect to database
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/ecosnap');
    console.log('📊 Connected to MongoDB');

    // Clear existing users (optional - comment out if you want to keep existing users)
    // await User.deleteMany({});
    // console.log('🗑️ Cleared existing users');

    // Test users to create
    const users = [
      {
        email: 'admin@ecosnap.com',
        password: 'admin123',
        userType: 'admin',
        profile: {
          firstName: 'Admin',
          lastName: 'User',
          phone: '1234567890'
        }
      },
      {
        email: 'citizen@ecosnap.com',
        password: 'citizen123',
        userType: 'citizen',
        profile: {
          firstName: 'John',
          lastName: 'Doe',
          phone: '9876543210',
          address: {
            street: '123 Main St',
            city: 'New York',
            state: 'NY',
            zipCode: '10001'
          }
        },
        citizen: {
          points: 150,
          level: 3,
          reportsCount: 15,
          badges: ['first-report', 'cleanup-hero']
        }
      },
      {
        email: 'organization@ecosnap.com',
        password: 'org123',
        userType: 'organization',
        organization: {
          companyName: 'CleanCo Services',
          registrationNumber: 'REG123456',
          businessLicense: 'LIC-2024-001',
          insuranceInfo: {
            provider: 'SafeGuard Insurance',
            policyNumber: 'POL-2024-001',
            expirationDate: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000),
            coverageAmount: 1000000
          },
          phone: '5551234567',
          address: {
            street: '456 Business Ave',
            city: 'New York',
            state: 'NY',
            zipCode: '10002'
          },
          serviceAreas: [
            { city: 'New York', state: 'NY', zipCodes: ['10001', '10002'], radius: 10 },
            { city: 'Brooklyn', state: 'NY', zipCodes: ['11201', '11202'], radius: 10 },
            { city: 'Queens', state: 'NY', zipCodes: ['11354', '11355'], radius: 10 }
          ],
          capabilities: ['general-cleanup', 'bulk-items', 'graffiti-removal'],
          teamSize: 10,
          equipment: ['Trucks', 'Cleaning supplies', 'Safety gear'],
          pricing: {
            baseRate: 50,
            hourlyRate: 75,
            emergencyMultiplier: 2
          },
          verification: {
            status: 'verified',
            documents: ['/uploads/license.pdf', '/uploads/insurance.pdf'],
            verifiedAt: new Date()
          },
          rating: {
            average: 4.5,
            totalReviews: 25
          },
          subscription: {
            plan: 'premium',
            status: 'active',
            startDate: new Date(),
            endDate: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000) // 1 year from now
          }
        }
      },
      {
        email: 'test@example.com',
        password: 'test123',
        userType: 'citizen',
        profile: {
          firstName: 'Test',
          lastName: 'User',
          phone: '1112223333'
        }
      }
    ];

    // Create users
    for (const userData of users) {
      const existingUser = await User.findOne({ email: userData.email });
      
      if (existingUser) {
        console.log(`⚠️  User ${userData.email} already exists - skipping`);
      } else {
        await User.create(userData);
        console.log(`✅ Created user: ${userData.email} (${userData.userType})`);
      }
    }

    console.log('\n🎉 Seed completed successfully!');
    console.log('\n📝 Test Credentials:');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log('\n👤 ADMIN:');
    console.log('   Email: admin@ecosnap.com');
    console.log('   Password: admin123');
    console.log('\n👥 CITIZEN:');
    console.log('   Email: citizen@ecosnap.com');
    console.log('   Password: citizen123');
    console.log('\n🏢 ORGANIZATION:');
    console.log('   Email: organization@ecosnap.com');
    console.log('   Password: org123');
    console.log('\n🧪 TEST USER:');
    console.log('   Email: test@example.com');
    console.log('   Password: test123');
    console.log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');

    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding database:', error);
    process.exit(1);
  }
};

seedUsers();
