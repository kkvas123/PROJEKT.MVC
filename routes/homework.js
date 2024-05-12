const express = require("express");

const router = express.Router();

const controller = require("../controllers/homework")

router.get("/", controller.renderListPage);

router.get("/addHomework", controller.renderAddPage);

router.post("/addHomework", controller.addNewHomework);

router.get("/editHomework/:id", controller.renderEditPage);

router.post("/editHomework/:id", controller.editHomework);

module.exports = router;

