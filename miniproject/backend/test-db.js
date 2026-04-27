const { sequelize } = require('./config/db');
const { User, News, Action, Campaign } = require('./models');

async function testDB() {
  try {
    // 1. Test Connection
    await sequelize.authenticate();
    console.log('✅ Connection has been established successfully.');

    // 2. Query Data counts
    const userCount = await User.count();
    const newsCount = await News.count();
    const actionCount = await Action.count();
    const campaignCount = await Campaign.count();

    console.log('\n📊 Database Statistics:');
    console.log(`- Users: ${userCount}`);
    console.log(`- News Articles: ${newsCount}`);
    console.log(`- Eco Actions: ${actionCount}`);
    console.log(`- Campaigns: ${campaignCount}`);

    // 3. Print Admin User if exists
    const admin = await User.findOne({ where: { role: 'admin' } });
    if (admin) {
      console.log(`\n👑 Admin User Found: ${admin.email}`);
    } else {
      console.log('\n⚠️ No Admin User found.');
    }

    process.exit(0);
  } catch (error) {
    console.error('❌ Unable to connect to the database:', error.message);
    process.exit(1);
  }
}

testDB();
