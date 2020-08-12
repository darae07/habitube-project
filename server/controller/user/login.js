const { users } = require('../../models');
const crypto = require('crypto');
module.exports = {
  post: (req, res) => {
    let { email, password } = req.body;
    var sess = req.session;
    var shasum = crypto.createHash('sha1').update(password).digest('hex');

    password = shasum;

    users
      .findOne({
        where: {
          email: email,
          password: password,
        },
      })
      .then((user) => {
        if (!user) {
          res.status(404).send({
            message: 'ID and password do not match',
          });
        } else {
          sess.userid = user.id;
          res.status(200).json({
            userInfo: {
              username: user.username,
              email: user.email,
              id: user.id,
              keyword: user.keyword,
            },
          });
        }
      })
      .catch((err) => {
        res.status(404).send(err);
      });
  },
};
