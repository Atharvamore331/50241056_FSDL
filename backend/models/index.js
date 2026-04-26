const User = require('./User');
const News = require('./News');
const Action = require('./Action');
const Campaign = require('./Campaign');
const CommunityPost = require('./CommunityPost');
const Resource = require('./Resource');

// Associations
User.belongsToMany(News, { as: 'SavedArticles', through: 'UserSavedArticles' });
News.belongsToMany(User, { through: 'UserSavedArticles' });

User.belongsToMany(Action, { as: 'CompletedActions', through: 'UserCompletedActions' });
Action.belongsToMany(User, { through: 'UserCompletedActions' });

User.belongsToMany(Campaign, { as: 'JoinedCampaigns', through: 'UserJoinedCampaigns' });
Campaign.belongsToMany(User, { through: 'UserJoinedCampaigns' });

module.exports = {
  User,
  News,
  Action,
  Campaign,
  CommunityPost,
  Resource
};
