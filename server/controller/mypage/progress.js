const { todobox } = require('../../models');

module.exports = {
  get: (req, res) => {
    let { userid } = req.session;
    //userid가 같은 todoboxes의 데이터들 총합
    //얻은 todoboxes 데이터 중 isCompleted가 true인 데이터들 수
    // Math.floor(트루수 / 총합 *100) 로 소수점 버린 값을 얻음
    //그렇게 얻은 값을 보내줌
    console.log(userid);
    todobox
      .findAll({
        where: { usersId: userid },
        attributes: ['isComplete'],
      })
      .then((todoboxes) => {
        if (todoboxes.length === 0) {
          res.status(404).send({
            message: 'Unable to get todobox',
          });
        } else {
          let total = todoboxes.length;
          todobox
            .findAll({
              where: {
                usersId: userid,
                isComplete: true,
              },
              attributes: ['isComplete'],
            })
            .then((trueData) => {
              console.log(trueData);
              let trueComplete = trueData.length;
              let result = Math.floor((trueComplete / total) * 100);
              console.log(result);
              res.status(200).send({
                progress: result,
              });
            });
        }
      })
      .catch((err) => {
        res.status(404).send({
          message: 'Unable to get todobox',
        });
      });
  },
};
