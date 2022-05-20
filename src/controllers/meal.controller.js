const assert = require("assert");
const pool = require("../database/dbconnection");
const jwt = require("jsonwebtoken");
const jwtSecretKey = require("../config/config").jwtSecretKey;

const controller = {
  validateMeal: (req, res, next) => {
    let user = req.body;
    let { name, description, price, maxAmountOfParticipants } = user;
    try {
      assert(typeof name === "string", "Name must be a string.");
      assert(typeof description === "string", "Description must be a string.");
      assert(typeof price === "number", "Price must be an integer.");
      assert(
        typeof maxAmountOfParticipants === "number",
        "maxAmountOfParticipants must be an integer"
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
      next(error);
    }
  },
  getAllMeals: (req, res, next) => {
    pool.query("SELECT * FROM meal", (err, result, fields) => {
      res.status(200).json({
        status: 200,
        result: result,
      });
    });
  },
  //Details of meal
  getMealById: (req, res, next) => {
    const mealId = req.params.id;
    pool.query(
      `SELECT * FROM meal where id=${mealId}`,
      (err, result, fields) => {
        res.status(200).json({
          status: 200,
          result: result,
        });
      }
    );
  },
  addMeal: (req, res, next) => {
    const meal = req.body;
    pool.query(`INSERT INTO meal SET ?`, meal, (err, result) => {
      if (err) {
        console.log(err.message);
        const error = {
          status: 409,
          message: "Meal has not been added",
        };
        next(error);
      } else {
        res.status(201).json({
          status: 201,
          message: "Meal is toegevoegd in database",
          result: { id: result.insertId, ...meal },
        });
      }
    });
  },
  updateMeal: (req, res, next) => {
    const mealId = req.params.id;
    const meal = req.body;
    const token = jwt.decode(req.headers.authorization);
    if (meal.cookId == token.id) {
      pool.query(
        `UPDATE meal SET isActive =${meal.isActive}, isVega=${meal.isVega}, isVegan=${meal.isVegan}, isToTakeHome=${meal.isToTakeHome}, dateTime=${meal.dateTime},maxAmountOfParticipants=${meal.maxAmountOfParticipants}, price=${meal.price}, imageUrl=${meal.imageUrl}, cookId=${meal.cookId}, createDate=${meal.createDate}, updateDate=${meal.updateDate}, name=${meal.name}, description=${meal.description}, allergenes=${meal.allergenes} `,
        (err, results) => {
          const { affectedRows } = results;
          if (err) throw err;
          if (affectedRows == 0) {
            const error = {
              status: 404,
              message: "Meal with provided id does not exist",
            };
            next(error);
          } else {
            res.status(200).json({ status: 200, result: "Succusful update!" });
          }
        }
      );
    } else {
      res.status(403).json({
        status: 403,
        message: "Cannot update a meal that is not yours!",
      });
    }
  },
  deleteMeal: (req, res, next) => {},
};

module.exports = controller;
