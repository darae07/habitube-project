const { users } = require('../../models');
const { youtubeKey } = require('../../config/config.js');
const fetch = require('node-fetch');

const searchYouTube = ({ query, max, key }, callback) => {
  fetch(
    `https://www.googleapis.com/youtube/v3/search?q=${encodeURI(
      query,
    )}&maxResults=${max}&part=snippet&type=video&key=${key}`,
  )
    .then((res) => res.json())
    .then((json) => {
      callback(json.items);
    });
};
module.exports = {
  get: (req, res) => {
    let { userid } = req.session;
    if (userid) {
      users
        .findOne({
          where: {
            id: userid,
          },
          attributes: ['keyword'],
        })
        .then(({ keyword }) => {
          console.log(keyword);
          let searchArg = { query: keyword, max: 3, key: youtubeKey };
          searchYouTube(searchArg, (videoList) => {
            let result = [];
            for (let i = 0; i < videoList.length; i++) {
              result.push({
                id: videoList[i].id.videoId,
                snippet: {
                  title: videoList[i].snippet.title,
                  thumbnails: {
                    medium: {
                      url: videoList[i].snippet.thumbnails.medium.url,
                    },
                  },
                },
              });
            }
            console.log(result);
            res.status(200).send(result);
          });
        });
    } else {
      res.status(404).send({
        message: "Don't find userID",
      });
    }
  },
};
