const express = require("express");
const router = express.Router();

const {
  GetMessage,
  SearchRepoName,
  GetDashboard,
  DeleteRepo,
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

router.route("/import").post(GetMessage);
router.route("/login").post(CheckUser);
router.route("/register").post(CreateUser);
router.route("/search").post(SearchRepoName);
router.route("/dashboard").post(GetDashboard);
router.route("/delete").post(DeleteRepo);
// =========== add ===============
router.route("/committerCompany").post(getCommitterData);
router.route("/stargazerCompany").post(getStargazerData);
router.route("/issueCompany").post(getIssueData);
// ===============================


module.exports = router;