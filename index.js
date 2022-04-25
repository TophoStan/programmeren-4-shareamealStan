const express = require("express");
const app = express();
const port = process.env.PORT || 3000;

const bodyParser = require("body-parser");
app.use(bodyParser.json());

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

const userRoute = require("./routes/User");
const mealRoute = require("./routes/Meal");
app.use("/api/user", userRoute);
app.use("/api/meal", mealRoute);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
