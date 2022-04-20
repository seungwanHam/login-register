const userStore = require("../../store/user");

function login(req, res) {
  const { id, password } = req.body;

  // id와 password가 null도 아니고 undefined도 아닌 경우
  if (id && password) {
    const user = userStore.findUser(id);
    if (user) {
      if (user.userPassword === password) {
        res.json({
          result: true,
          user: id,
        });
        return;
      }
      // 패스워드가 맞지 않는경우
      res.status(400).json({
        result: false,
        reason: "password not match",
      });
      return;
    }
    // user가 없는경우
    res.status(404).json({
      result: false,
      reason: "user not found",
    });
    return;
  }
  // id, pw 없는 경우
  res.status(400).json({
    result: false,
    reason: "field not fullfilled",
  });
}

function register(req, res) {
  const { id, password } = req.body;

  if (id && password) {
    const user = userStore.findUser(id);
    if (!user) {
      userStore.addUser(id, password);
      res.json({
        result: true,
        user: id,
      });
      return;
    }
    res.json({
      result: false,
      reason: "user already exists",
    });
    return;
  }
  res.status(400).json({
    result: false,
    reason: "field not fullfilled",
  });
}

module.exports = {
  login,
  register,
};
