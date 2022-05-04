const assert = require("assert");
const pool = require("../../database/dbconnection");

let database = [];
let id = 0;

let controller = {
  validateUser: (req, res, next) => {
    let user = req.body;
    let { firstName, lastName, emailAdress, password } = user;
    try {
      assert(typeof firstName === "string", "firstName must be a string");
      assert(typeof lastName === "string", "lastName must be a string");
      assert(typeof emailAdress === "string", "emailAdress must be a string");
      assert(typeof password === "string", "password must be a string");
      assert(
        firstName.length > 0,
        "firstName must be atleast one character long"
      );
      assert(
        lastName.length > 0,
        "lastName must be atleast one character long"
      );
      assert(
        emailAdress.length > 0,
        "emailAdress must be atleast one character long"
      );
      assert(
        password.length > 0,
        "password must be atleast one character long"
      );

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
    if (result.length) {
      res.status(409).json({
        status: 409,
        result: "User is niet toegevoegd in database",
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
        status: 200,
        message: "User is toegevoegd in database",
        result: user,
      });
    }
  },
  getAllUsers: (req, res) => {
    let users = [];
    pool.query("SELECT * FROM user", (error, results, fields) => {
      console.log("#results: " + results.length);
      results.forEach((user) => {
        users.push(user);
      });
      res.status(200).json({
        status: 200,
        result: users,
      });
    });
  },
  getUserById: (req, res, next) => {
    const userId = req.params.userId;
    pool.query(
      `SELECT * FROM user WHERE id =${userId}`,
      (err, results, fields) => {
        if (err) throw err;
        if (results.length > 0) {
          res.status(200).json({
            status: 200,
            result: results,
          });
        } else {
          const error = {
            status: 400,
            message: "user with provided Id does not exist",
          };

          next(error);
        }
      }
    );
  },
  getUserProfile: (req, res) => {
    res.status(200).json({
      message: "Not implemented yet",
    });
  },
  updateUser: (req, res) => {
    const userId = req.params.userId;
    const user = req.body;
    pool.query(
      `UPDATE user SET firstName = '${user.firstName}', lastName = '${user.lastName}', street = '${user.street}', city = '${user.city}', emailAdress = '${user.emailAdress}', password = '${user.password}' WHERE id = ${userId}`,
      (err, results) => {
        if (err) throw err;
        
      }
    );
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
