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

  static #getUsers(data, isAll, fields) {
    //유저의 정보를 불러옴
    const users = JSON.parse(data);
    if (isAll) return users;
    const newUsers = fields.reduce((newUsers, field) => {
      if (users.hasOwnProperty(field)) {
        newUsers[field] = users[field];
      }
      return newUsers;
    }, {});
    console.log(newUsers);
    return newUsers; //newUsers없으면 반환한 값이 없어서 오류 발생
  }

  static getUsers(isAll, ...fields) {
    return fs
      .readFile("./src/databases/users.json") //Promise 반환
      .then((data) => {
        return this.#getUsers(data, isAll, fields);
      })
      .catch(console.error);
  }
  static getUsersInfo(id) {
    return fs
      .readFile("./src/databases/users.json") //Promise 반환
      .then((data) => {
        return this.#getUserInfo(data, id);
      })
      .catch(console.error);
  }

  static async save(userInfo) {
    const users = await this.getUsers(true); //모든 데이터 가져옴
    console.log(users);
    if (users.id.includes(userInfo.id)) {
      //return new Error로 만들경우 오류 발생
      //Error로 작성할 경우 object로 나옴
      throw "이미 존재하는 아이디입니다.";
    }
    users.id.push(userInfo.id);
    users.name.push(userInfo.name);
    users.pw.push(userInfo.pw);
    users.email.push(userInfo.email);
    fs.writeFile("./src/databases/users.json", JSON.stringify(users));
    return { success: true };
  }
}

module.exports = UserStorage;
