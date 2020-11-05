const router = require("express").Router();
router.get("/", (req, res) => {
  res.json({
    error: null,
    data: {
      title: "Welcome!",
      user: req.body.name,
      email:req.body.email,
      jenis_kelamin:req.body.jenis_kelamin
    },
  });
});
module.exports = router;