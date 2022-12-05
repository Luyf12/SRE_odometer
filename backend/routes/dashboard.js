const express = require("express");
const router = express.Router();

const {
  GetMessage,
  SearchRepoName,
  GetDashboard,
  DeleteRepo,
  //new interface about design
  GetDesignMessage,
  getTopic,
  getTopicFrequency,
  getDesignFrequency
} = require("../controllers/dash");
const { CheckUser, CreateUser } = require("../controllers/user");
// =========== add ===============
const {
  RepoGetCommitters,
  RepoGetIssues,
  RepoGetStargazers,
  getCommitterData,
  getIssueData,
  getStargazerData,
} = require("../controllers/company");
// ===============================
const { GetFrequency } = require("../controllers/frequency");


router.route("/import").post(GetMessage);
router.route("/login").post(CheckUser);
router.route("/register").post(CreateUser);
router.route("/search").post(SearchRepoName);
router.route("/dashboard").post(GetDashboard);
router.route("/delete").post(DeleteRepo);
// =========== add design information saver =============
router.route("/importDesign").post(GetDesignMessage);
// =========== add ===============
router.route("/committerCompany").post(getCommitterData);
router.route("/stargazerCompany").post(getStargazerData);
router.route("/issueCompany").post(getIssueData);
// ===============================
// ===============================
// get frequecny
router.route("/getFrequency").post(GetFrequency);
// ===============================
// ============= getters about design ===============
router.route("/getTopic").post(getTopic),
router.route("/getTopicFrequency").post(getTopicFrequency),
router.route("/getDesignFrequency").post(getDesignFrequency)

module.exports = router;