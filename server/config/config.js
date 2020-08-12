module.exports = {
  development: {
    username: process.env.DATABASE_ID,
    password: process.env.DATABASE_PASSWORD,
    database: 'habitube',
    host: 'localhost',
    dialect: 'mysql',
    logging: false,
  },
  youtubeKey: process.env.YOUTUBE_KEY,
};
