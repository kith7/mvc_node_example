const usersDB = {
  users: require("../model/users.json"),
  setUsers: function (data) {
    this.users = data;
  },
};

const fsPromises = require("fs").promises;
const path = require("path");
const bcrypt = require("bcrypt");

const handleNewUser = async (req, res) => {
  const { user, pwd } = req.body;
  if (!user || !pwd)
    res.status(400).json({
      message:
        "Username and password are required in order to register a new user",
    });
  //check for duplicates in the DB:
  const duplicate = usersDB.users.find((user) => user.username === user);
  if (duplicate) res.sendStatus(409);

  try {
    //use bcrypt to encrypt the pass remember to add the salt
    const hashedPass = await bcrypt.hash(pwd, 10);
    //store the nuew user with the password
    const newUser = { username: user, password: hashedPass };
    usersDB.setUsers([...usersDB.users, newUser]);

    //write it in our file:
    await fsPromises.writeFile(
      path.join(__dirname, "..", "..", "model", "users.json")
    );
    console.log(usersDB);
    res.status(201).json({ success: `New user ${user} created!` });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = { handleNewUser };
