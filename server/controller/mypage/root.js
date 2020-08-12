const { todobox } = require('../../models');

module.exports = {
  get: (req, res) => {
    let { userid } = req.session;
    todobox
      .findAll({
        where: { usersId: userid },
        attributes: [
          'memoTitle',
          'memoContent',
          'youtubeInfo',
          'isComplete',
          'date',
        ],
      })
      .then((todoboxes) => {
        if (todoboxes.length === 0) {
          res.status(404).send({
            message: 'Unable to get todobox',
          });
        } else {
          let result = {};
          for (let i = 0; i < todoboxes.length; i++) {
            let monthBox = todoboxes[i].date.slice(0, 7).split('-').join('_');
            if (!(monthBox in result)) {
              result[monthBox] = [];
            }
            result[monthBox].push(todoboxes[i]);
          }
          res.status(200).send(result);
        }
      })
      .catch((err) => {
        res.status(404).send({
          message: 'Unable to get todobox',
        });
      });
  },
};
