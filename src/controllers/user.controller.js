const assert = require("assert");

let database = [];
let id = 0;

let controller = {
  validateUser: (req, res, next) => {
    let user = req.body;
    let { firstName, lastName, emailAddress, password } = user;
    try {
      assert(typeof firstName === "string", "firstName Must be a String");
      assert(typeof lastName === "string", "lastName Must be a String");
      assert(typeof emailAddress === "string", "emailAddress Must be a String");
      next();
    } catch (err) {
      console.log(err.message);
      res.status(400).json({
        status: 400,
        error: err.toString(),
      });
    }
  },
  addUser: (req, res) => {
    const result = database.filter(
      (user) => user.emailAddress == req.body.emailAddress
    );
    if (result.length > 0) {
      res.status(409).json({
        message: "User is niet toegevoegd in database",
      });
    } else {
      let user = req.body;
      id++;
      user = {
        id,
        firstName: user.firstName,
        lastName: user.lastName,
        street: user.street,
        city: user.city,
        emailAddress: user.emailAddress,
        phoneNumber: user.phoneNumber,
        password: user.password,
        roles: user.roles,
      };
      database.push(user);
      res.status(200).json({
        message: "User is toegevoegd in database",
        result: user,
      });
    }
  },
  getAllUsers: (req, res) => {
    res.status(200).json({
      message: "Succesful retrieval",
      result: database,
    });
  },
  getUserById: (req, res) => {
    const userId = req.params.userId;
    let result = database.filter((user) => user.id == userId);
    if (result.length > 0) {
      console.log(result);
      res.status(200).json({
        result: result,
      });
    } else {
      res.status(404).json({
        message: "No user with provided id",
      });
    }
  },
  getUserProfile: (req, res) => {
    res.status(200).json({
      message: "Not implemented yet",
    });
  },
  updateUser: (req, res) => {
    let userId = req.params.userId;
    const result = database.findIndex((user) => user.id == userId);
    if (result > -1) {
      let user = req.body;
      database[result] = {
        id: result + 1,
        firstName: user.firstName,
        lastName: user.lastName,
        street: user.street,
        city: user.city,
        emailAddress: user.emailAddress,
        phoneNumber: user.phoneNumber,
        password: user.password,
        roles: user.roles,
      };
      res.status(200).json({
        message: "succes",
        result: database[result],
      });
    } else {
      res.status(404).json({
        message: "User with provided id does not exist",
      });
    }
  },
  deleteUser: (req, res) => {
    let userId = req.params.userId;
    console.log(userId);
    const result = database.findIndex((user) => user.id == userId);
    if (result > -1) {
      database.splice(userId - 1, 1);
      res.status(200).json({
        message: "Succesfully deleted user",
      });
    } else {
      res.status(404).json({ message: "User with provided id does not exist" });
    }
  },
};

module.exports = controller;
