var express = require("express");
var router = express.Router();
const User = require("../model/user");
const multer = require("multer");
const bcrypt = require("bcrypt");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, "../public/uploads"));
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  },
});

const upload = multer({ storage });

//   const storage = multer.diskStorage({
//     destination: (req, file, cb) => cb(null, "uploads/"),
//     filename: (req, file, cb) =>
//       cb(null, Date.now() + "-" + file.originalname),
//   });

//   const upload = multer({ storage });


router.post("/signup", (req, res) => {
  const hash = bcrypt.hashSync(req.body.password, 10);
  let token = uid2(32);

  User.findOne({ email: req.body.email })
    .then((data) => {
      if (data == null) {
        const newUser = new User({
          username: req.body.username,
          email: req.body.email,
          admin: true,
          token: token,
          password: hash,
          profilePicture: null,
        });
        newUser.save().then((data) => {
          console.log(data);
          if (data) {
            res.json({ result: true, data });
          } else {
            res.json({ result: false, error: "Impossible to register" });
          }
        });
      } else {
        res.json({ result: false, error: "User already exist" });
      }
    })
    .catch((error) => {
      console.log(error);
      res.json({ result: false, error });
    });
});

router.post("/signin", (req, res) => {
  User.findOne({ email: req.body.email })
    .then((data) => {
      if (data && bcrypt.compareSync(req.body.password, data.password)) {
        res.json({ result: true, data: data });
      } else {
        res.json({ result: false, error: "User not found or wrong password" });
      }
    })
    .catch((error) => {
      console.log(error);
      res.json({ result: false, error });
    });
});

module.exports = router;
