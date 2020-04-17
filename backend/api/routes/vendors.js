const express = require("express");
const router = express.Router();

const VendorController = require('../controllers/vendors');
const checkAuth = require('../middleware/check-token');

// router.post("/addVendor2", checkAuth, VendorController.addVendor2);

router.post("/addVendor", checkAuth, VendorController.addVendor);



router.post("/getVendors", checkAuth, VendorController.getVendors);

module.exports = router;