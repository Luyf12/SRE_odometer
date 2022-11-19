const asyncWrapper = require("../middleware/async");
const { createCustomError } = require("../errors/custom-error");
const CompanySchema = require("../models/company");

const { Octokit } = require("@octokit/core");
const res = require("express/lib/response");

const octokit = new Octokit({
  auth: `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`,
  //auth可以去https://github.com/settings/tokens生成，上面这个auth是永久的
});

// 这里公司的划分其实有点问题。。。因为有母公司/子公司的问题，例如Deepmind是Google旗下的, 那到底要不要算进去呢。。。
function HandleCompanyName(name){
  // 去掉头尾空格
  name = name.trim().toLowerCase();
  if(name[0] == '@')
  name = name.substring(1, name.length);
  if(Facebook(name))
    name = "Facebook";
  else if(Deepmind(name))
    name = "Deepmind";
  else if(Google(name))
    name = "Google";
  else if(Twitter(name))
    name = "Twitter";
  else if(Intel(name))
    name = "Intel";
  else if(Pytorch(name))
    name = "Pytorch";
  else if(Quansight(name))
    name = "Quansight";
  else if(Nvidia(name))
    name = "NVIDIA";
  else if(Microsoft(name))
    name = "Microsoft";
  else if(IBM(name))
    name = "IBM";
  else if(Alibaba(name))
    name = "Alibaba";

  return name;
}

function Facebook(name){
  if(name.includes("facebook") || name.includes("meta"))
    return true;
  else return false;
}

function Pytorch(name){
  if(name.includes("pytorch"))
    return true;
  else return false;
}

function Quansight(name){
  if(name.includes("quansight"))
    return true;
  else return false;
}

function IBM(name){
  if(name.includes("ibm"))
    return true;
  else return false;
}

function Microsoft(name){
  if(name.includes("microsoft"))
    return true;
  else return false;
}

function Google(name){
  if(name.includes("google"))
    return true;
  else return false;
}

function Twitter(name){
  if(name.includes("twitter"))
    return true;
  else return false;
}

function Intel(name){
  if(name.includes("intel"))
    return true;
  else return false;
}

function Nvidia(name){
  if(name.includes("nvidia"))
    return true;
  else return false;
}

function Deepmind(name){
  if(name.includes("deepmind"))
    return true;
  else return false;
}

function Alibaba(name){
  if(name.includes("alibaba"))
    return true;
  else return false;
}

// 3000个
// 由于commits实在太多了，所以这里用contributors来代替
const RepoGetCommitters = async (owner, name) => {

  var result = [];
  var company = new Map();
  var company_name = "";
  
  // for (var i = 1; i <= 80; i++) {
  for (var i = 1; i <= 3; i++) {
    console.log("COMMITERS");
    const NextRepoMessage = await octokit.request(
      // "GET /repos/{owner}/{repo}/commits",
      "GET /repos/{owner}/{repo}/contributors",
    {
      owner: owner,
      repo: name,
      per_page: 100,
      page: i,
    }
    );
    console.log("length = " + NextRepoMessage.data.length);
    if (NextRepoMessage.data.length == 0) break;

    for (var j = 0; j < NextRepoMessage.data.length; j++) {
      const userMessage = await octokit.request("GET /users/{username}", {
        // username: NextRepoMessage.data[j].committer.login,
        username: NextRepoMessage.data[j].login,
      });

      // 下面是利用这个接口统计 committer - company 的
      var s = userMessage.data.company;
      if(s!=null && s != "")
        company_name = HandleCompanyName(s);
      if(company_name != null && company_name != "" && !company.has(company_name)){
         company.set(company_name, 1);
      }
      else if(company_name != null  && company.has(company_name)){
        company.set(company_name, company.get(company_name)+1);
      }
    }
    
  }

  var c = Array.from(company);
  c.sort(function(a, b){return b[1] - a[1]});
  for(var[key, value] of c){
    var ss = {
      company: key,
      num: value,
    };
    result.push(ss);
  }
  console.log(result);
  return result;
};

// 60000个
const RepoGetStargazers = async (owner, name) => {
  var result = [];
  var company = new Map();
  var company_name = "";

  // for (var i = 1; i <= 800; i++) {
  for (var i = 1; i <= 3; i++) {
    console.log("STARGAZERS");
    const NextRepoMessage = await octokit.request(
      "GET /repos/{owner}/{repo}/stargazers",
    {
      owner: owner,
      repo: name,
      per_page: 100,
      page: i,
    }
    );
    console.log("length = " + NextRepoMessage.data.length);
    if (NextRepoMessage.data.length == 0) break;

    for (var j = 0; j < NextRepoMessage.data.length; j++) {
      const userMessage = await octokit.request("GET /users/{username}", {
        username: NextRepoMessage.data[j].login,
      });

      // 下面是利用这个接口统计 committer - company 的
      var s = userMessage.data.company;
      if(s!=null && s != "")
        company_name = HandleCompanyName(s);
      if(company_name != null && company_name != "" && !company.has(company_name)){
         company.set(company_name, 1);
      }
      else if(company_name != null  && company.has(company_name)){
        company.set(company_name, company.get(company_name)+1);
      }
    }
    
  }
  var c = Array.from(company);
  c.sort(function(a, b){return b[1] - a[1]});
  for(var[key, value] of c){
    var ss = {
      company: key,
      num: value,
    };
    result.push(ss);
  }
  console.log(result);
  return result;
};

// 10000个
const RepoGetIssues = async (owner, name) => {
  var result = [];
  var company = new Map();
  var company_name = "";

  // for (var i = 1; i <= 80; i++) {
  for (var i = 1; i <= 3; i++) {
    console.log("ISSUES");
    const NextRepoMessage = await octokit.request(
      "GET /repos/{owner}/{repo}/issues",
    {
      owner: owner,
      repo: name,
      per_page: 100,
      page: i,
    }
    );
    console.log("length = " + NextRepoMessage.data.length);
    if (NextRepoMessage.data.length == 0) break;

    for (var j = 0; j < NextRepoMessage.data.length; j++) {
      const userMessage = await octokit.request("GET /users/{username}", {
        username: NextRepoMessage.data[j].user.login,
      });
      // 下面是利用这个接口统计 committer - company 的
      var s = userMessage.data.company;
      if(s!=null && s != "")
        company_name = HandleCompanyName(s);
      if(company_name != null && company_name != "" && !company.has(company_name)){
         company.set(company_name, 1);
      }
      else if(company_name != null  && company.has(company_name)){
        company.set(company_name, company.get(company_name)+1);
      }
    }
    
  }
  var c = Array.from(company);
  c.sort(function(a, b){return b[1] - a[1]});
  for(var[key, value] of c){
    var ss = {
      company: key,
      num: value,
    };
    result.push(ss);
  }
  console.log(result);
  return result;
};

const getCommitterData = async (name_, owner_) => {
  try {
    const detail = await CompanySchema.findOne({
        name: name_,
        owner: owner_,
      });
    const result = detail.committers;
    console.log(result);
    res.status(201).json({ result });
  } catch (err) {
    res.status(404).json(err);
  }
};

const getIssueData = async (name_, owner_) => {
  try {
    const detail = await CompanySchema.findOne({
        name: name_,
        owner: owner_,
      });
    const result = detail.issues;
    console.log(result);
    res.status(201).json({ result });
  } catch (err) {
    res.status(404).json(err);
  }
};

const getStargazerData = async (name_, owner_) => {
  try {
    const detail = await CompanySchema.findOne({
        name: name_,
        owner: owner_,
      });
    const result = detail.stargazers;
    console.log(result);
    res.status(201).json({ result });
  } catch (err) {
    res.status(404).json(err);
  }
};

  module.exports = {
    RepoGetCommitters,
    RepoGetIssues,
    RepoGetStargazers,
    getCommitterData,
    getIssueData,
    getStargazerData,
  };