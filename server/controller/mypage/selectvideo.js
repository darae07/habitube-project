const { todobox } = require('../../models');

module.exports = {
  post: (req, res) => {
    let { id, selectedVideo, memoTitle, memoContent, date } = req.body;
    todobox
      .update(
        {
          youtubeInfo: selectedVideo,
          memoTitle: memoTitle,
          memoContent: memoContent,
        },
        {
          where: {
            usersId: id,
            date: date,
          },
        },
      )
      .then((updatedCount) => {
        if (updatedCount[0] === 0) {
          res.status(404).send({
            message: 'Does not match the target date',
          });
        } else {
          res.status(200).send({
            message: 'Success',
          });
        }
      })
      .catch((err) => {
        res.status(404).send({
          message: 'There is no video information.',
        });
      });
  },
};
