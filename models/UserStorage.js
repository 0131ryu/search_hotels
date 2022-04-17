"use strict";

const fs = require("fs").promises;

class UserStorage {
  static #getUserInfo(data, id) {
    const users = JSON.parse(data);
    const idx = users.id.indexOf(id);
    //Object.key(users) => [id, pw, name]
    const userInfo = Object.keys(users).reduce((newUser, info) => {
      newUser[info] = users[info][idx];
      return newUser;
    }, {});
    console.log(userInfo);
    return userInfo;
  }

  static getUsers(...fields) {
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
    return fs
      .readFile("./src/databases/users.json") //Promise 반환
      .then((data) => {
        return this.#getUserInfo(data, id);
      })
      .catch(console.error);
  }

  static save(userInfo) {
    // const users = this.#users;
    users.id.push(userInfo.id);
    users.name.push(userInfo.name);
    users.pw.push(userInfo.pw);
    users.email.push(userInfo.email);

    return { success: true };
  }
}

module.exports = UserStorage;
