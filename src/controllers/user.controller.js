const assert = require("assert");
const pool = require("../../database/dbconnection");

let controller = {
  validateUser: (req, res, next) => {
    let user = req.body;
    let {
      firstName,
      lastName,
      street,
      city,
      isActive,
      emailAdress,
      phoneNumber,
      password,
    } = user;
    try {
      assert(typeof firstName === "string", "Firstname must be a string");
      assert(typeof lastName === "string", "LastName must be a string");
      assert(typeof street === "string", "Street must be a string");
      assert(typeof city === "string", "City must be a string");
      // assert(typeof isActive === "number", "IsActive must be a number");
      assert(typeof emailAdress === "string", "EmailAddress must be a string");
      assert(typeof phoneNumber === "string", "PhoneNumber must be a string");
      assert(typeof password === "string", "Password must a string");

      next();
    } catch (err) {
      console.log(err.message);
      const error = {
        status: 400,
        result: err.message,
        message: err.message,
      };
      next(error);
    }
  },
  validateId: (req, res, next) => {
    const userId = req.params.id;
    try {
      assert(Number.isInteger(parseInt(userId)), "Id must be a number");
      next();
    } catch (err) {
      console.log(req.body);
      const error = {
        status: 400,
        message: err.message,
      };

      console.log(error);
      next(error);
    }
  },
  addUser: (req, res, next) => {
    const user = req.body;
    pool.query("INSERT INTO user SET ?", user, (dbError, result) => {
      if (dbError) {
        console.log(dbError.message);
        const error = {
          status: 409,
          message: "User has not been added",
          result: "User is niet toegevoegd in database",
        };
        next(error);
      } else {
        console.log(result.insertId);
        user.userId = result.insertId;
        res.status(201).json({
          status: 201,
          message: "User is toegevoegd in database",
          result: user,
        });
      }
    });
  },
  getAllUsers: (req, res) => {
    const { firstName, lastName } = req.query;
    console.log(req.query);

    let queryString = "SELECT * FROM user ";
    if (firstName || lastName) {
      queryString += "WHERE ";
      if (firstName) {
        queryString += `firstName = '${firstName}'`;
      }

      if (firstName && lastName) {
        queryString += ` AND `;
      }

      if (lastName) {
        queryString += `lastName = '${lastName}'`;
      }
    }
    console.log(queryString);
    let users = [];
    pool.query(queryString, (error, results, fields) => {
      if (!results) {
        res.status(204).json({
          status: 204,
          message: "No users found with the provided paramaters",
        });
      } else {
        results.forEach((user) => {
          users.push(user);
        });
        res.status(200).json({
          status: 200,
          result: users,
        });
      }
    });
  },
  getUserById: (req, res, next) => {
    const userId = req.params.id;
    pool.query(
      `SELECT * FROM user WHERE id =${userId}`,
      (err, results, fields) => {
        if (err) throw err;

        if (results[0]) {
          res.status(200).json({
            status: 200,
            result: results,
          });
        } else {
          const error = {
            status: 404,
            message: "User with provided Id does not exist",
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
  updateUser: (req, res, next) => {
    const userId = req.params.id;
    const user = req.body;
    pool.query(
      `UPDATE user SET firstName = '${user.firstName}', lastName = '${user.lastName}', street = '${user.street}', city = '${user.city}', emailAdress = '${user.emailAdress}', password = '${user.password}' WHERE id = ${userId}`,
      (err, results) => {
        const { affectedRows } = results;
        if (err) throw err;

        if (affectedRows == 0) {
          const error = {
            status: 404,
            message: "User with provided id does not exist",
            result: "User with provided id does not exist",
          };
          next(error);
        } else {
          res.status(200).json({ status: 200, result: "Succusful update!" });
        }
      }
    );
  },
  deleteUser: (req, res, next) => {
    const userId = req.params.id;
    pool.query(`DELETE FROM user WHERE id=${userId}`, (err, results) => {
      if (err) throw err;
      const { affectedRows } = results;
      if (!affectedRows) {
        const error = {
          status: 400,
          result: "User does not exist",
        };
        next(error);
      } else {
        res.status(200).json({ status: 200, result: "Succesful deletion" });
      }
    });
  },
};

module.exports = controller;
