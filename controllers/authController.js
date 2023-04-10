const usersDB = {
  users: require("../model/users.json"),
  setUsers: function (data) {
    this.users = data;
  },
};

const bcrypt = require("bcrypt");

const handleLogin = async (req, res) => {
  const { user, pwd } = req.body;
  if (!user || !pwd)
    res.status(400).json({ message: "Please provide user and password" });
  const foundUser = usersDB.users.find((pers) => pers.username === user);
  if (!foundUser) res.sendStatus(401);
  //user found and match:
  const match = await bcrypt.compare(pwd, foundUser.password);
  if (match) {
    //here we can create w JWT
    res.json({ success: `User ${user} is logged in` });
  } else {
    res.sendStatus(401);
  }
};

module.exports = { handleLogin };
