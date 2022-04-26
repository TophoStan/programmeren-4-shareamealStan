const assert = require("assert");

let database = [];
let id = 0;

let controller = {
  validateUser: (req, res, next) => {
    let user = req.body;
    let { firstName, lastName, emailAdress, password } = user;
    try {
      assert(typeof firstName === "string", "firstName Must be a String");
      assert(typeof lastName === "string", "lastName Must be a String");
      assert(typeof emailAdress === "string", "emailAdress Must be a String");
      next();
    } catch (err) {
      const error = {
        status: 400,
        result: err.message,
      };
      next(error);
    }
  },
  addUser: (req, res) => {
    const result = database.filter(
      (user) => user.emailAdress == req.body.emailAdress
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
        emailAdress: user.emailAdress,
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
  getUserById: (req, res, next) => {
    const userId = req.params.userId;
    let result = database.filter((user) => user.id == userId);
    if (result.length > 0) {
      console.log(result);
      res.status(200).json({
        result: result,
      });
    } else {
      const error = {
        status: 404,
        result: `User with Id ${userId} does not exist`,
      };
      next(error);
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
        emailAdress: user.emailAdress,
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
