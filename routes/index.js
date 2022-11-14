const express = require("express");
const router = express.Router();
const fdrController = require("../controllers/fdrController");

router.get("/fdrByAddress/:address", fdrController.fdrByAddress);

module.exports = router;
