const { Router } = require("express");
const ApplicationController = require("../controllers/application-controller.js");
const { isAuth, isStaff } = require("../middlewares");

const router = Router();

router.post("/", isAuth, ApplicationController.createApplication);
router.put("/:id", isAuth, ApplicationController.updateApplication);
router.get("/self", isAuth, ApplicationController.getUserApplications);
router.get("/:id", isAuth, ApplicationController.getApplicationById);
router.get("/", isAuth, isStaff, ApplicationController.getAllApplications);
router.put("/:id/submit", isAuth, ApplicationController.applicantChangeStatus);
router.put("/:id/review", isAuth, ApplicationController.staffChangeStatus);
router.delete("/:id", isAuth, ApplicationController.deleteApplication);

module.exports = router;
