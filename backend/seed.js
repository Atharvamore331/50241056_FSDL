const bcrypt = require('bcryptjs');
const { sequelize, connectDB } = require('./config/db');
const { News, Action, Campaign, CommunityPost, Resource, User } = require('./models');

const seedData = async () => {
  try {
    await connectDB();
    
    // Sync models
    await sequelize.sync({ force: true });
    console.log('Database tables created.');

    // Create Admin User
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash('admin123', salt);
    await User.create({
      name: 'Eco Admin',
      email: 'admin@eco.com',
      password: hashedPassword,
      role: 'admin',
      points: 1000
    });
    console.log('Admin user created.');

    // Seed News
    await News.bulkCreate([
      { 
        title: 'Global Carbon Emissions Show Decline in Q1 2026', 
        category: 'Climate Change', 
        summary: 'The latest report from the International Energy Agency indicates a 3% drop in global carbon emissions compared to last year, driven mainly by the rapid adoption of renewable energy in developing nations.', 
        date: '2026-04-10', 
        image: 'https://images.unsplash.com/photo-1569000971952-6d0b63581174?auto=format&fit=crop&w=800&q=80', 
        url: 'https://www.iea.org/reports/global-energy-review-co2-emissions-in-2021-2',
        trending: true 
      },
      { 
        title: 'Major Cities Ban Single-Use Plastics', 
        category: 'Pollution', 
        summary: 'A coalition of 15 major metropolitan areas has officially implemented zero-tolerance policies for single-use plastics, encouraging local businesses to adopt biodegradable alternatives.', 
        date: '2026-04-08', 
        image: 'https://images.unsplash.com/photo-1618477432743-1629d8a39c59?auto=format&fit=crop&w=800&q=80', 
        url: 'https://www.unep.org/news-and-stories/story/single-use-plastic-bags-and-their-alternatives-many-shades-green',
        trending: true 
      },
      { 
        title: 'Breakthrough in Solar Panel Efficiency', 
        category: 'Renewable Energy', 
        summary: 'Engineers have developed a new photovoltaic cell capable of 35% efficiency, promising cheaper and more accessible solar power for residential areas over the next decade.', 
        date: '2026-04-05', 
        image: 'https://images.unsplash.com/photo-1509391366360-2e959784a276?auto=format&fit=crop&w=800&q=80', 
        url: 'https://www.nrel.gov/pv/cell-efficiency.html',
        trending: false 
      },
      { 
        title: 'Endangered Coral Reefs Show Signs of Recovery', 
        category: 'Wildlife', 
        summary: 'Thanks to intense conservation efforts and localized cooling interventions, the Great Barrier Reef is demonstrating the highest coral regeneration rates seen in the past twenty years.', 
        date: '2026-04-01', 
        image: 'https://images.unsplash.com/photo-1582967788606-a171c1080cb0?auto=format&fit=crop&w=800&q=80', 
        url: 'https://www.aims.gov.au/monitoring-great-barrier-reef/gbr-condition-summary-2021-22',
        trending: false 
      }
    ]);

    // Seed Actions
    await Action.bulkCreate([
      { title: 'Use a reusable water bottle for a week', difficulty: 'Easy', impact: 'Medium', points: 20 },
      { title: 'Switch to energy-efficient LED bulbs', difficulty: 'Easy', impact: 'Medium', points: 30 },
      { title: 'Commute via bike or public transit', difficulty: 'Medium', impact: 'High', points: 50 },
      { title: 'Start a home composting bin', difficulty: 'Hard', impact: 'High', points: 100 }
    ]);

    // Seed Campaigns
    await Campaign.bulkCreate([
      { title: 'Earth Day City Cleanup', date: '2026-04-22', location: 'Central Park, NY', type: 'Offline', registered: 450 },
      { title: 'Zero Waste Challenge Webinar', date: '2026-04-25', location: 'Zoom', type: 'Online', registered: 1200 }
    ]);

    // Seed Community Posts
    await CommunityPost.bulkCreate([
      { author: 'EcoWarrior99', title: 'Switched to Bamboo Products!', content: 'I finally replaced all my bathroom plastics with bamboo alternatives. Surprisingly cheap and looks amazing! Small steps matter.', category: 'Sustainable Living', likes: 142 },
      { author: 'GreenTechFan', title: 'My DIY Solar Charger', content: 'Built a small solar rig for my balcony to charge all my devices. It saves a tiny bit on the electricity bill, but it feels great to run on the sun.', category: 'Renewable Energy', likes: 89 }
    ]);

    // Seed Resources
    await Resource.bulkCreate([
      { title: 'The Ultimate Guide to Composting', type: 'PDF Guide', url: 'https://www.epa.gov/recycle/composting-home' },
      { title: 'Household Energy Efficiency Calculator', type: 'Tool', url: 'https://www.epa.gov/ghgemissions/household-carbon-footprint-calculator' }
    ]);

    console.log('Database seeded successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error.message);
    process.exit(1);
  }
};

seedData();
