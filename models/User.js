"use stict";
const UserStorage = require("./UserStorage");

class User {
  //생성자
  constructor(body) {
    this.body = body;
  }
  async login() {
    const client = this.body;

    //아래의 부분은 나중에 읽어야 함
    // console.log(await UserStorage.getUsersInfo(client.id));
    const { id, pw } = await UserStorage.getUsersInfo(client.id);

    if (id) {
      if (id === client.id && pw === client.pw) {
        return { success: true };
      }
      return { success: false, msg: "비밀번호가 틀렸습니다." };
    }
    return { success: false, msg: "존재하지 않는 아이디입니다." };
  }

  register() {
    const client = this.body;
    const response = UserStorage.save(client);
    return response;
  }
}

module.exports = User;
