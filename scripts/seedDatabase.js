const sequelize = require('../src/config/db');
const UserHealthProfile = require('../src/models/userHealthProfileModel');

async function seedUserProfile() {
  try {
    await sequelize.authenticate();
    console.log('✅ Connected to the database.');

    await UserHealthProfile.create({
      userId: '8aceec82-62d2-4ea3-9482-36eeaae32a26',
      age: 26,
      gender: 'Male',
      height: 175,
      weight: 70,
      activityLevel: 'Moderately Active',
      healthGoal: 'Lose Weight'
    });

    console.log('✅ UserHealthProfile seeded successfully.');
    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding UserHealthProfile:', error);
    process.exit(1);
  }
}

seedUserProfile();
