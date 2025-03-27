const { Router } = require("express");
const ApplicationController = require("../controllers/application-controller.js");
const { isAuth, checkRole } = require("../middlewares");

const router = Router();

router.post(
  "/",
  isAuth,
  checkRole(["applicant"]),
  ApplicationController.createApplication
);
router.put(
  "/:id",
  isAuth,
  checkRole(["applicant"]),
  ApplicationController.updateApplication
);
router.get(
  "/self",
  isAuth,
  checkRole(["applicant"]),
  ApplicationController.getUserApplications
);
router.get("/:id", isAuth, ApplicationController.getApplicationById);
router.get(
  "/",
  isAuth,
  checkRole(["reviewer", "admin"]),
  ApplicationController.getAllApplications
);
router.put(
  "/:id/submit",
  isAuth,
  checkRole(["applicant"]),
  ApplicationController.applicantChangeStatus
);
router.put(
  "/:id/review",
  isAuth,
  checkRole(["reviewer", "admin"]),
  ApplicationController.staffChangeStatus
);
router.delete(
  "/:id",
  isAuth,
  checkRole(["applicant"]),
  ApplicationController.deleteApplication
);

module.exports = router;
