const express = require("express");
const router = express.Router();

const {
  GetMessage,
  SearchRepoName,
  GetDashboard,
  DeleteRepo,
  GetAnalyzeData,
  //new interface about design
} = require("../controllers/dash");
const { CheckUser, CreateUser } = require("../controllers/user");
// =========== company ===============
const {
  getCommitterData,
  getIssueData,
  getStargazerData,
  getCompanyData,
} = require("../controllers/company");
// ===============================
const { GetFrequency, GetCoreUsers } = require("../controllers/frequency");
// ========== pr ==============
const { 
  getDesignFrequency ,
  getTopic,
  getTopicFrequency,
  getWeekDesignFreq,
  getWeekTopicFreq,
} = require("../controllers/design");

// ============================

router.route("/import").post(GetMessage);
router.route("/login").post(CheckUser);
router.route("/register").post(CreateUser);
router.route("/search").post(SearchRepoName);
router.route("/dashboard").post(GetDashboard);
router.route("/delete").post(DeleteRepo);
// =========== add import =============
router.route("/importAnalyzeData").post(GetAnalyzeData);
// =========== add design =============
router.route("/getDesign").post(getDesignFrequency);
router.route("/getTopic").post(getTopic);
router.route("/getTopicFrequency").post(getTopicFrequency);
// =========== add week ===============
router.route("/getWeekDesign").post(getWeekDesignFreq);
router.route("/getWeekTopicFrequency").post(getWeekTopicFreq)
// =========== add company=============
router.route("/getCompany").post(getCompanyData);
router.route("/committerCompany").post(getCommitterData);
router.route("/stargazerCompany").post(getStargazerData);
router.route("/issueCompany").post(getIssueData);
// ===========add frequency ======
router.route("/getFrequency").post(GetFrequency);
// =========== add core_users ====
router.route("/GetCoreUsers").post(GetCoreUsers)
module.exports = router;
