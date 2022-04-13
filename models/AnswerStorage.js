"use strict";

class answerStorage {
  static #answers = {
    stayNum: [1, 2, 3, 4, 5],
    yesNo: ["네", "아니오"],
    bed: ["싱글", "더블", "트윈"],
  };

  static getAnswer(...fields) {
    const answers = this.#answers;

    const newAnswers = fields.reduce((newAnswers, field) => {
      if (answers.hasOwnProperty(field)) {
        newAnswers[field] = answers[field];
      }
      return newAnswers;
    }, {});
    console.log(newAnswers);
    return newAnswers;
  }

  static getAnswerInfo(stayNum) {
    const answers = this.#answers;
    const stayNumx = answers.stayNum.indexOf(stayNum);
    //Object.key(users) => [stayNum, yesNo, bed]
    const answerInfo = Object.keys(answers).reduce((newAnswer, info) => {
      newAnswer[info] = answers[info][stayNumx];
      return newAnswer;
    }, {});
    return answerInfo;
  }
}

module.exports = answerStorage;
