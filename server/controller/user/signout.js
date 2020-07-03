const { users } = require('../../models');
module.exports = {
  post: (req, res) => {
    const sess = req.session;

    if (sess.userid) {
  
      req.session.destroy(err => {
        if (err) {
          console.log(err);
        } else {
          res.redirect('/');//기본적으로 302코드
        }
      });
    } else {
      res.redirect('/');
    }
  },
};