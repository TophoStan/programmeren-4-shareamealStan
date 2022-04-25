const express = require("express");
const router = express.Router();

let database = [];
let id = 0;

router.post("/", (req, res) => {
  const result = database.filter(
    (user) => user.emailaddress == req.body.emailaddress
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
      firstname: user.firstname,
      lastname: user.lastname,
      street: user.street,
      city: user.city,
      emailaddress: user.emailaddress,
      phonenumber: user.phonenumber,
      password: user.password,
      roles: user.roles,
    };
    database.push(user);
    res.status(200).json({
      message: "User is toegevoegd in database",
      result: user,
    });
  }
});

router.get("/", (req, res) => {
  res.status(200).json({
    message: "Succesful retrieval",
    result: database,
  });
});

router.get("/profile", (req, res) => {
  res.status(200).json({
    message: "Not implemented yet",
  });
});

router.get("/:userId", (req, res) => {
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
});

router.put("/:userId", (req, res) => {
  let userId = req.params.userId;
  const result = database.findIndex((user) => user.id == userId);
  if (result > -1) {
    let user = req.body;
    database[result] = {
      id: result + 1,
      firstname: user.firstname,
      lastname: user.lastname,
      street: user.street,
      city: user.city,
      emailaddress: user.emailaddress,
      phonenumber: user.phonenumber,
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
});

router.delete("/:userId", (req, res) => {
  let userId = req.params.userId;
  console.log(userId);
  const result = database.findIndex((user) => user.id == userId);
  if (result > -1) {
    database.splice(userId, 1);
    res.status(200).json({
      message: "Succesfully deleted user",
    });
  } else {
    res.status(404).json({ message: "User with provided id does not exist" });
  }
});

module.exports = router;
