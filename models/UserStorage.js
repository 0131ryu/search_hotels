"use strict";

class UserStorage {
  static #users = {
    id: ["test", "me", "today"],
    pw: ["1234", "1234", "1111"],
    name: ["테스트", "나임", "오늘"],
  };

  static getUsers(...fields) {
    const users = this.#users;
    //새로운 정보를 담음
    const newUsers = fields.reduce((newUsers, field) => {
      if (users.hasOwnProperty(field)) {
        newUsers[field] = users[field];
      }
      return newUsers;
    }, {});
    console.log(newUsers);
    return newUsers; //newUsers없으면 반환한 값이 없어서 오류 발생
  }
  static getUsersInfo(id) {
    const users = this.#users;
    const idx = users.id.indexOf(id);
    //Object.key(users) => [id, pw, name]
    const userInfo = Object.keys(users).reduce((newUser, info) => {
      newUser[info] = users[info][idx];
      return newUser;
    }, {});
    return userInfo;
  }
}

module.exports = UserStorage;
