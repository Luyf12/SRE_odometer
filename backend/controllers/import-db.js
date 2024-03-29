const asyncWrapper = require("../middleware/async");
const { Octokit } = require("@octokit/core");

const octokit = new Octokit({
  auth: `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`,
  //auth可以去https://github.com/settings/tokens生成，上面这个auth是永久的
});
const PullNumberSchema = require("../models/pullNumber")

const RepoGetCoreContributor = async ( owner, name ) => {
    const message = await octokit.request(
        "GET /repos/{owner}/{repo}/stats/contributors",
        {
            owner: owner,
            repo: name,
           
        },
    );
    res = []
    data = message.data;
    for(let i = 0; i < data.length; ++i){
        changes = 0;
        w = data[i].weeks;
        for(let j = 0; j < w.length; ++j){
            changes += w[j].a - w[j].d;
        }
        res.push({
            name: data[i].author.login, 
            lines: changes
        });
    }
    res = SortAndTrim(res);
    console.log(res);
    return res;
}

/*获取commit信息*/
const RepoGetCommitData = async (owner,name) => {
    console.log("RepoGetCommitData...");
    var pageid=1;
    var weekCommits = {};
    var monthCommits = {};
    var yearCommits = {};
    var startDate = "";
    var endDate = "";
    var curWeek;
    /*要存全部的commits吗*/
    var committers = {}
    var committs = [];
    while(true){
        if(pageid>400)
            break;
        const commitMessage = await octokit.request(
            //直接获取全部commits
            "GET /repos/{owner}/{repo}/commits",
            {
                owner: owner,
                repo: name,
                per_page: 100,
                page: pageid,
            },
            
        );

        if(commitMessage.data.length==0){
            console.log("finish with",pageid);
            break; //没有记录，跳出循环
        }
        console.log("processing "+pageid+" page...");

        //主循环
        for(var i=0;i<commitMessage.data.length;++i){     
                  
            console.log("getting lines...",i);
            // 处理frequency
            // 获取每一条commit的时间
            let date = commitMessage.data[i].commit.committer.date.slice(0,10);
            console.log(date);
            if(pageid==1&&i==0){
                endDate = date;  //记录最近的时间
                curWeek = new Date(date); //当前周开始日期
                curWeek.setDate(curWeek.getDate()-7);
            }
            startDate = date;   //记录最早的记录时间
            //month commit
            let month = date.slice(0,7);
            if(monthCommits[month]!=null) {
                monthCommits [month] += 1;
            }else {
                monthCommits[month] = 1;
            }
            //year commit
            let year = month.slice(0,4);
            if(yearCommits[year]!=null) {
                yearCommits [year] += 1;
            }else {
                yearCommits[year] = 1;
            }
            //week commit,以7天为单位,
            //如果当前日期小于当前所在周，就看看中间空了多少周就再填进去,注意数据是倒序的
            let curDate = new Date(date);
            while(curDate<curWeek){
                curWeek.setDate(curWeek.getDate()-7);  //curWeek --
                curMonth = (curWeek.getMonth()<9?"0":"")+(curWeek.getMonth()+1);
                curDay = (curWeek.getDate()<10?"0":"")+curWeek.getDate();
                let now=curWeek.getFullYear()+"-"+curMonth+"-"+curDay;
                weekCommits[now]=0; //填0
            }
            //现在这个日期属于curWeek
            curMonth = (curWeek.getMonth()<9?"0":"")+(curWeek.getMonth()+1);
            curDay = (curWeek.getDate()<10?"0":"")+curWeek.getDate();
            let now =curWeek.getFullYear()+"-"+curMonth+"-"+curDay;
            if(weekCommits[now]==null){
                weekCommits[now]=1;
            }else{
                weekCommits[now]++;
            }
        }
        ++pageid;
    }

    /*遍历，没有的都置为0,转为对象数组*/
    weekCommits = await FillWithZero(weekCommits,startDate,endDate,"week");
    monthCommits = await FillWithZero(monthCommits,startDate.slice(0,7),endDate.slice(0,7),"month");
    yearCommits = await FillWithZero(yearCommits,startDate.slice(0,4),endDate.slice(0,4),"year");

    var res = {weekCommits, monthCommits, yearCommits};
    console.log(res);

    return res;
};

/*获取每个pull request的编号*/
const RepoGetPullNumber= async (owner, name) => {
    console.log("RepoGetPullNumber...");
    let pageid = 1;
    var pull_numbers = []
    // 获取全部url
    while(true){
        if(pageid>400)
            break;
        const pullMessage = await octokit.request(
            //直接获取全部pull request的信息，包括open和closed的
            "GET /repos/{owner}/{repo}/pulls",
            {
                owner: owner,
                repo: name,
                per_page: 100,
                page: pageid,
                state: "all"    
            }
        );
        if(pullMessage.data.length==0){
            break; //没有记录，跳出循环
        }

        console.log("processing "+pageid+" page...");

        //主循环，可以从这里获取信息,不知道要不要存主体？
        for(var i=0;i<pullMessage.data.length;++i){    
            // console.log("processing...",i);
            // 统计核心用户
            // let user_name = pullMessage.data[i].user.login;
            pull_numbers.push(pullMessage.data[i].number);
        }
        ++pageid;
    }
    console.log(pull_numbers.length);
    const is_existed = await PullNumberSchema.findOne({
        name:name,
        owner:owner
    });
    // if it des not exist, create a new one or update instead
    if(is_existed == null ) {
        const f1 = await PullNumberSchema.create({
            name:name,
            owner:owner,
            numbers:pull_numbers,
            pullers: {'none':0}
        });
        console.log("create!");

    } else {
        const f2 = await PullNumberSchema.updateOne({
            name:name,
            owner:owner
        },
        {
            $set:{
                numbers:pull_numbers,
                pullers:{'none':0}     
            }
        });
    }
    return 0;
}
/*统计并返回core pullers */
const RepoGetCorePullers = async (owner, name) => {
    console.log("RepoGetCorePullers...");
    const doc = await PullNumberSchema.findOne({
        name: name,
        owner: owner
    });
    pullers = doc.pullers;

    // pullers = doc.pullers;
    console.log(pullers,);

    console.log(doc.numbers.length);

    // search for every urls and count
    for(var i = 0; i<doc.numbers.length; ++i){
        const changes = await octokit.request(
            "GET /repos/{owner}/{repo}/pulls/{number}",
        {
            owner: owner,
            repo: name,
            state: "all",
            number: doc.numbers[i]
        });
        console.log("getting details...",i,"/",doc.numbers.length);
        user_name = changes.data.user.login;
        let total_changes = changes.data.additions - changes.data.deletions;
        if(pullers[user_name]==null){
            pullers[user_name] = total_changes;
        } else {
            pullers[user_name] += total_changes;
        }
    }
    // await PullNumberSchema.updateOne({
    //     name:name,
    //     owner:owenr
    // },
    // {
    //     $set:{
    //         pullers:pullers
        
    //     }
    // });

    sorted_pullers = [];
    for(let u in pullers) {
        sorted_pullers.push({name:u, lines: pullers[u]});
    }
    var res = await SortAndTrim(sorted_pullers);
    
    console.log(res);
    return res;
}
/*根据line of code统计核心puller */
const RepoGetPullData = async (owner, name) => {
    const f1 = await RepoGetPullNumber(owner,name);
    const f2 = await RepoGetCorePullers(owner,name);
    console.log(f2);
    return f2;
}


/*获取issue信息
*此处仅统计了时间相关的信息
这里既有issue又有pull request，要区分状态吗？
*/
const RepoGetIssueData = async (owner, name) => {
    console.log("RepoGetIssueData...");

    var weekIssues = {};
    var monthIssues = {};
    var yearIssues = {};
    let pageid = 1;
    var startDate = "";
    var endDate = "";
    var curWeek;
    while(true){
        if(pageid>400)
            break;
        const issueMessage = await octokit.request(
            "GET /repos/{owner}/{repo}/issues",
            {
                owner: owner,
                repo: name,
                per_page: 100,
                page: pageid ,
                state: "all"
            }
        );
        if(issueMessage.data.length==0){
            break; //没有记录，跳出循环
        }
        console.log("processing "+pageid+" page...");

        //主循环
        for(var i=0;i<issueMessage.data.length;++i){           
            //获取每一条issue的时间
            let date = issueMessage.data[i].created_at.slice(0,10);
            
            if(pageid==1&&i==0){
                endDate = date;  //记录最近的时间
                curWeek = new Date(date); //当前周开始日期
                curWeek.setDate(curWeek.getDate()-7);
            }
            startDate = date;   //记录最早的记录时间
            //month pull
            let month = date.slice(0,7);
            if(monthIssues[month]!=null){
                monthIssues [month] += 1;
            }else{
                monthIssues[month] = 1;
            }
            //year pull
            let year = month.slice(0,4);
            if(yearIssues[year]!=null){
                yearIssues [year] += 1;
            }else{
                yearIssues[year] = 1;
            }
        
            //week pull,以7天为单位,
            //如果当前日期小于当前所在周，就看看中间空了多少周就再填进去,注意数据是倒序的
            let curDate = new Date(date);
            while(curDate<curWeek){
                curWeek.setDate(curWeek.getDate()-7);  //curWeek --
                curMonth = (curWeek.getMonth()<9?"0":"")+(curWeek.getMonth()+1);
                curDay = (curWeek.getDate()<10?"0":"")+curWeek.getDate();
                let now=curWeek.getFullYear()+"-"+curMonth+"-"+curDay;
                weekIssues[now]=0; //填0
            }
            //现在这个日期属于curWeek
            curMonth = (curWeek.getMonth()<9?"0":"")+(curWeek.getMonth()+1);
            curDay = (curWeek.getDate()<10?"0":"")+curWeek.getDate();
            let now =curWeek.getFullYear()+"-"+curMonth+"-"+curDay;
            if(weekIssues[now]==null){
                weekIssues[now]=1;
            }else{
                weekIssues[now]++;
            }
        }
        ++pageid;
    }
    /*遍历，没有的都置为0,转为对象数组*/
    weekIssues = await FillWithZero(weekIssues,startDate,endDate,"week");
    monthIssues = await FillWithZero(monthIssues,startDate.slice(0,7),endDate.slice(0,7),"month");
    yearIssues = await FillWithZero(yearIssues,startDate.slice(0,4),endDate.slice(0,4),"year");

    var res = {weekIssues, monthIssues, yearIssues};
    console.log(res);

    return res;

}

/*这里返回的数据时间是正序的*/
const RepoGetStarData = async (owner, name) => { 
    console.log("RepoGetStarData...");

    var weekStars = {};
    var monthStars = {};
    var yearStars = {};
    let pageid = 1;
    var startDate = "";
    var endDate = "";
    var curWeek;
    var nextWeek;
    while(true){
        if(pageid>400)
            break;
        const starMessage = await octokit.request(
            "GET /repos/{owner}/{repo}/stargazers",
            {
                owner: owner,
                repo: name,
                per_page: 100,
                page: pageid,
                headers: {
                    Accept: 'application/vnd.github.star+json',
                },
            }
        );
        if(starMessage.data.length==0){
            break; //没有记录，跳出循环
        }
        console.log("processing "+pageid+" page...");

        //主循环
        for(var i=0;i<starMessage.data.length;++i){           
            //获取每一条star的时间
            let date = starMessage.data[i].starred_at.slice(0,10);
            if(pageid==1&&i==0){
                endDate = date;  //记录最近的时间
                curWeek = new Date(date); //当前周开始日期
                nextWeek = new Date(curWeek);
                nextWeek.setDate(nextWeek.getDate()+7);

            }
            startDate = date;   //记录最早的记录时间
            //month pull
            let month = date.slice(0,7);
            if(monthStars[month]!=null){
                monthStars [month] += 1;
            }else{
                monthStars[month] = 1;
            }
            //year pull
            let year = month.slice(0,4);
            if(yearStars[year]!=null){
                yearStars [year] += 1;
            }else{
                yearStars[year] = 1;
            }
        
            //week pull,以7天为单位,
            let curDate = new Date(date);
            while(curDate>nextWeek){
                curWeek.setDate(curWeek.getDate()+7);  //curWeek ++
                nextWeek.setDate(nextWeek.getDate()+7); //nextWeek++;
                curMonth = (curWeek.getMonth()<9?"0":"")+(curWeek.getMonth()+1);
                curDay = (curWeek.getDate()<10?"0":"")+curWeek.getDate();
                let now=curWeek.getFullYear()+"-"+curMonth+"-"+curDay;
                weekStars[now]=0; //填0
            }

            //现在这个日期属于curWeek
            curMonth = (curWeek.getMonth()<9?"0":"")+(curWeek.getMonth()+1);
            curDay = (curWeek.getDate()<10?"0":"")+curWeek.getDate();
            let now =curWeek.getFullYear()+"-"+curMonth+"-"+curDay;
            if(weekStars[now]==null){
                weekStars[now]=1;
            }else{
                weekStars[now]++;
            }
        }
        ++pageid;
    }
    /*遍历，没有的都置为0,转为对象数组*/
    weekStars = await FillWithZero(weekStars,startDate,endDate,"week");
    monthStars = await FillWithZero(monthStars,startDate.slice(0,7),endDate.slice(0,7),"month");
    yearStars = await FillWithZero(yearStars,startDate.slice(0,4),endDate.slice(0,4),"year");
    var res = {weekStars, monthStars, yearStars};
    console.log(res);

    return res;


}
/*没有数据的时间填为0,转为对象数组*/
const FillWithZero = async (obj, start, end, option) => {
    switch(option){
        //year
        case "year":
            for(var y=start; y<=end; ++y){
                if(obj[y]==null){
                    obj[y]=0;
                }
            }
            break;
        //month
        case "month":
            var sy = start.slice(0,4), ey=end.slice(0,4);
            for(var y=sy; y<=ey; ++y){
                sm = y==sy?start.slice(5,7):1;
                em = y==ey?end.slice(5,7):12;
                for(var m = Number(sm); m <= em; ++m){
                    let month = y+"-"+(m<10?"0":"")+m;
                    if(obj[month]==null){
                        obj[month]=0;
                    }
                }
            }
            break;
    }
    let arr = [];
    for(i in obj){
        arr.push({date:i, frequency:obj[i]});
    }
    arr.sort((a,b)=>{return a.date>b.date?1:-1;}); //排序
    return arr;
}

// sort line of code arrays
const SortAndTrim = async ( arr ) => {
    arr.sort((a,b) => {return b.lines - a.lines;});
    // 取前20%，如果小于等于5个，就直接取committers总人数，如果太多就取10个 [0-10]
    let len = arr.length;
    per = Math.floor(len*0.2);
    let threshold = len <= 5 ? len : ( per <= 5 ? 5 : Math.min(10,per));
    return arr.slice(0, threshold);
}

module.exports = {
    RepoGetCoreContributor,
    RepoGetCommitData,
    RepoGetPullData,
    RepoGetIssueData,
    RepoGetStarData,
};
