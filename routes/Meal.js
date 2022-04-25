const express = require("express");
const router = express.Router();

let database = [];
let id = 0;

router.post("/", (req, res) => {
  let meal = req.body;
  id++;
  meal = {
    id,
    ...meal,
  };
  console.log(meal);
  database.push(meal);
  res.status(201).json({
    status: 201,
    result: database,
  });
});

router.get("/:mealId", (req, res, next) => {
  const mealId = req.params.mealId;
  console.log(`meal met ID ${mealId} gezocht`);
  let meal = database.filter((item) => item.id == mealId);
  if (meal.length > 0) {
    console.log(meal);
    res.status(200).json({
      status: 200,
      result: meal,
    });
  } else {
    res.status(401).json({
      status: 401,
      result: `meal with ID ${mealId} not found`,
    });
  }
});

router.get("/", (req, res, next) => {
  res.status(200).json({
    status: 200,
    result: database,
  });
});

module.exports = router;
