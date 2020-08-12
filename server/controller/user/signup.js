const { users } = require('../../models');
module.exports = {
  post: (req, res) => {
    //req = email, password, username;

    let { email, password, username } = req.body;
    users
      .findOne({
        where: { email: email },
      })
      .then((user) => {
        if (user) {
          res.status(404).send({
            message: 'This email is already there',
          });
        } else {
          users
            .create({
              email: email,
              username: username,
              password: password,
            })
            .then(() => {
              res.status(200).send({
                message: 'SignUp Completed',
              });
            });
        }
      })
      .catch((err) => {
        res.status(500).send(err);
      });
  },
};
