const router = require("express").Router();
router.get("/", (req, res) => {
  res.json({
    error: null,
    data: {
      title: "Welcome!",
      user: req.user.name,
      email:req.user.email,
      jenis_kelamin:req.user.jenis_kelamin,
    },
  });
});
module.exports = router;
