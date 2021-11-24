const router = require("express").Router();
const sessions = require("../controllers/sessions");
const validations = require("../validations/sessions");

router.get("/", sessions.getAll);
router.get("/:id", sessions.getById);
router.post("/", validations.required, validations.validate, sessions.create);
router.put("/:id", validations.required, validations.validate, sessions.update);
router.delete("/:id", sessions.remove);

module.exports = router;