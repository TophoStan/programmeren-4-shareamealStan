const express = require("express");
const app = express();
const port = process.env.PORT || 3000;

const bodyParser = require("body-parser");
app.use(bodyParser.json());

let database = [];
let id = 0;

app.all("*", (req, res, next) => {
  const method = req.method;
  console.log(`Method ${method} is aangeroepen`);
  next();
});

app.get("/", (req, res) => {
  res.status(200).json({
    status: 200,
    result: "Hello World",
  });
});

app.post("/api/meal", (req, res) => {
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

app.get("/api/meal/:mealId", (req, res, next) => {
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

app.get("/api/meal", (req, res, next) => {
  res.status(200).json({
    status: 200,
    result: database,
  });
});

app.all("*", (req, res) => {
  res.status(401).json({
    status: 401,
    result: "End-point not found",
  });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
