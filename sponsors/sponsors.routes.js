/* Sponsor API route definitions utilizing Express.js running on Node.js.
validateBody middleware functions and schema are implementations of Joi.js.
Route definitions are kept separate from controller and service layers,
adhering to best practices of clean, tidy code and single responsibility principle. */

const router = require('express').Router();
const sponsorsController = require('../controllers/sponsors.controller');
const validateBody = require('../filters/validate.body');
const SponsorsSchema = require('../models/sponsorsSchema');
const idFilter = require("../filters/id.filter");
// ... Code contributed by another team member.

module.exports = router

router.post("/",idFilter.bodyIdDisallowed, validateBody(SponsorsSchema), sponsorsController.getByEmail);
router.get("/", sponsorsController.readAll);
router.get("/:id", sponsorsController.getById);
router.put("/:id",idFilter.bodyIdRequired, validateBody(SponsorsSchema), /* ... Code contributed by another team member. */, sponsorsController.update);
router.delete("/:id", sponsorsController.del);
