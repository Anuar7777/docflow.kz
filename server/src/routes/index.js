const { Router } = require("express");
const authRoutes = require("./auth-router.js");

const router = Router();

router.use("/auth", authRoutes);

module.exports = router;
