const router = require("express").Router();
const User = require("../model/User");
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')


// validation
const {registValidation } = require("../validation");

// register route
router.post("/register", async (req, res) => {
  // validate the user
  const { error } = registValidation(req.body);

  // throw validation errors
  if (error) return res.status(400).json({ error: error.details[0].message });

  const isEmailExist = await User.findOne({ email: req.body.email });

  // throw error when email already registered
  if (isEmailExist)
    return res.status(400).json({ error: "Email already exists" });


  const user = new User({
    name: req.body.name,
    email: req.body.email,
    jenis_kelamin:req.body.jenis_kelamin,
  });

  try {
    const savedUser = await user.save();
    res.json({ error: null, data: { userId: savedUser._id } });
  } catch (error) {
    res.status(400).json({ error });
  }
});



// login route
router.post("/login", async (req, res) => {
    // validate the user
    const {
        error
    } = registValidation(req.body);
    // throw validation errors
    if (error) return res.status(400).json({
        error: error.details[0].message
    });
    const user = await User.findOne({
        email: req.body.email
    });
    // throw error when email is wrong
    if (!user) return res.status(400).json({
        error: "Email is wrong"
    });

    const gender =true;
    if (!gender)
        return res.status(400).json({
            error: "Gender is wrong"
        });
    // create token
    const token = jwt.sign(
        // payload data
        {
            name: user.name,
            id: user._id,
        },
        process.env.TOKEN_SECRET
    );
    res.header("auth-token", token).json({
        error: null,
        data: {
            token,
        },
    });
});
module.exports = router;
