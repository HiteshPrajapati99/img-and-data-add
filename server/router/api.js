const express = require("express");
const upload = require("../middleware/upload");
const routes = express.Router();
const scema = require("../module/scema");

// post api

routes.post("/create", async (req, res) => {
  const { name, email } = req.body;

  if (!name || !email) {
    res.status(404).send("plz fill the data");
  }

  try {
    const preUser = await scema.findOne({ email: email });
    // console.log(preUser);

    if (preUser) {
      res.send("this user is allredy registerd");
    } else {
      const addUser = new scema({
        name,

        email,
      });
      addUser.save();
      res.send("user add success");
    }
  } catch (error) {
    res.status(404).send(error);
  }
});

// get api

routes.get("/get", async function (req, res) {
  try {
    const userData = await scema.find();
    res.send(userData);
  } catch (error) {
    res.send(error);
  }
});

// delet api

routes.delete("/delet/:id", function (req, res) {
  scema.findByIdAndRemove({ _id: req.params.id }, function (err, user) {
    if (err) throw err;
    if (!user) {
      res.send({ success: false, message: "No user found" });
    } else {
      res.send({
        success: true,
        message: "Your Account has been delete now !!!",
      });
    }
  });
});

// get data using id for edit

routes.get("/edit/get/:id", function (req, res) {
  scema.findOne({ _id: req.params.id }, function (err, user) {
    if (err) throw err;
    if (!user) {
      res.json({ success: false, message: "No user found" });
    } else {
      res.json({ success: true, user: user });
    }
  });
});

// edit api

routes.put("/edit/:id", function (req, res) {
  scema.findOne({ _id: req.params.id }, function (err, data) {
    if (err) throw err;
    if (!data) {
      res.json({ success: false, message: "No user found" });
    } else {
      data.name = req.body.name;
      data.email = req.body.email;
      data.save(function (err) {
        if (err) {
          console.log(err);
        } else {
          res.json({ success: true, message: "Details has been updated!" });
        }
      });
    }
  });
});

// api for file and img

// routes.post("/profile", upload, function (req, res) {
//   let user = new scema();
//   user.name = req.body.name;
//   user.email = req.body.email;
//   user.profile_file = req.file.filename;
//   user.profile_path = req.file.path;
//   user.save();
//   res.json("file uploaded");
// });

routes.post("/profile", (req, res) => {
  upload(req, res, function (err) {
    if (err) {
      if (err.code === "LIMIT_FILE_SIZE") {
        res.json({ success: false, message: "Profile Image too large !!!" });
      } else if (err.code === "filetype") {
        res.json({
          success: false,
          message: "Invaild : Only jpeg, jpg and png supported !!!",
        });
      } else {
        console.log(err);
        res.json({ success: false, message: "Profile Image not upload !!!" });
      }
    } else {
      if (!req.file) {
        res.json({ success: false, message: "No file selected !!!" });
      } else {
        let user = new scema();

        user.name = req.body.name;
        user.email = req.body.email;
        user.password = req.body.password;
        user.profile_file = req.file.filename;
        user.profile_path = "http://localhost:8080/" + req.file.path;
        user.save(function (err) {
          if (err) {
            console.log(err.errors.name);
            if (err.errors.name) {
              res.json({ success: false, message: "Name is required" });
            } else if (err.errors.email) {
              res.json({ success: false, message: "E-mail is required" });
            } else if (err.errors.password) {
              res.json({ success: false, message: "Password is required" });
            } else {
              res.json({ success: false, message: err });
            }
          } else {
            res.json({ success: true, message: "Registration Successfully" });
          }
        });
      }
    }
  });
});

module.exports = routes;

// api urls

// post data url => "http://localhost:4000/create"
// get data url  => "http://localhost:4000/get"
// delet data url  =>  `http://localhost:4000/delet/${id}`
//  edit api data url => `http://localhost:4000/edit/${id}`
// get data using id => `http://localhost:4000/edit/${id}`
