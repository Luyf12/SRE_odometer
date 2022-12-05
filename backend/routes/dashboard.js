const express = require("express");
const router = express.Router();

const {
  GetMessage,
  SearchRepoName,
  GetDashboard,
  DeleteRepo,
  //new interface about design
} = require("../controllers/dash");
const { CheckUser, CreateUser } = require("../controllers/user");
// =========== company ===============
const {
  getCommitterData,
  getIssueData,
  getStargazerData,
} = require("../controllers/company");
// ===============================
const { GetFrequency } = require("../controllers/frequency");
// ========== pr ==============
const { 
  getDesignFrequency ,
  getTopic,
  getTopicFrequency,
} = require("../controllers/design");

// ============================

router.route("/import").post(GetMessage);
router.route("/login").post(CheckUser);
router.route("/register").post(CreateUser);
router.route("/search").post(SearchRepoName);
router.route("/dashboard").post(GetDashboard);
router.route("/delete").post(DeleteRepo);
// =========== add design =============
router.route("/getDesign").post(getDesignFrequency);
router.route("/getTopic").post(getTopic);
router.route("/getTopicFrequency").post(getTopicFrequency);
// =========== add company=============
router.route("/committerCompany").post(getCommitterData);
router.route("/stargazerCompany").post(getStargazerData);
router.route("/issueCompany").post(getIssueData);
// ===========add frequency ======
router.route("/getFrequency").post(GetFrequency);
// ===============================

module.exports = router;
