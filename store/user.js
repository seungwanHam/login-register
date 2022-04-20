/*
  {
    userID: ~,
    userPassword: ~
  }
*/

const userStore = {
  _users: [],
  get users() {
    return this._users;
  },
  set users(users) {
    this._users = users;
  },
  findUser: function (id) {
    return this._users.find(({ userId }) => id === userId);
  },
  addUser: function (id, password) {
    this._users.push({
      userId: id,
      userPassword: password,
    });
  },
};

module.exports = userStore;
