const { todobox } = require('../../models');

function dateFormat() {
  //['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  let year = new Date().getFullYear();
  let month = new Date().getMonth() + 1;
  let date = new Date().getDate();
  let day = new Date().getDay();
  let dayTable = ['일', '월', '화', '수', '목', '금', '토', '일'];
  month = '0' + month;
  date = '0' + date;
  let dateString = `${year}-${month.slice(-2)}-${date.slice(-2)} ${
    dayTable[day]
  }`;
  return dateString;
  // '2020-07-01 수'
}

module.exports = {
  get: (req, res) => {
    let { userid } = req.session;
    todobox
      .findOne({
        where: {
          usersId: userid, //유저아이디와 같으면서 date가 현재 날짜와 같을때
          date: dateFormat(),
        },
        attributes: ['isComplete'],
      })
      .then(({ isComplete }) => {
        todobox
          .update(
            {
              isComplete: !isComplete,
            },
            {
              where: {
                usersId: userid, //유저아이디와 같으면서 date가 현재 날짜와 같을때
                date: dateFormat(),
              },
            },
          )
          .then(() => {
            res.status(200).send({
              message: 'Success',
            });
          })
          .catch((err) => {
            res.status(404).send({
              message: "The type of 'isComplete' is wrong.",
            });
          });
      });
  },
};
