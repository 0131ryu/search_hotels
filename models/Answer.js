const AnswerStorage = require("./AnswerStorage");

class Answer {
  constructor(body) {
    this.body = body;
  }
  mode() {
    const body = this.body;
    const { stayNum, yesNo } = AnswerStorage.getAnswerInfo(body.stayNum);

    if (stayNum) {
      if (stayNum === body.stayNum && bed === body.bed) {
        return { success: true };
      }
      return { success: false, msg: "초과된 숫자입니다." };
    }
    return { success: false, msg: "bed값 중 다릅니다" };
  }
}

module.exports = Answer;
