const express = require("express");
const {  getItems, postManyItem } = require("../controllers/itemControllers");
const router = express.Router();


router.get('/all',getItems)
// router.post('/create',postItem)
router.post('/create/all',postManyItem)
module.exports = router;
