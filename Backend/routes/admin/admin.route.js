// routes/adminRoutes.js

const express = require("express");

const {
   createOrganizer
} = require("../../controllers/admin/admin.Controller");

const authMiddleware = require("../../middlewares/auth.middleware");

const roleMiddleware = require("../../middlewares/role.middleware");

const router = express.Router();


// ONLY SUPER ADMIN CAN CREATE ORGANIZER
router.post(
   "/create-organizer",

   authMiddleware,

   roleMiddleware("superadmin"),

   createOrganizer
);

module.exports = router;