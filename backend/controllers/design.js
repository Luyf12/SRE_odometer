const asyncWrapper = require("../middleware/async");
const { createCustomError } = require("../errors/custom-error");
const DesignSchema = require("../models/company");

const { Octokit } = require("@octokit/core");
const res = require("express/lib/response");

const octokit = new Octokit({
    auth: `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`,
    //auth可以去https://github.com/settings/tokens生成，上面这个auth是永久的
});

const designKeyWords = ['code', 'maintain', 'test', 'robust',
    'perform', 'config', 'document', 'clarif'];

const DealPullLabels = async (req, res) => {
    console.log('Processing labels now')

    var designFre = []  //[{time, design, undesign}]
    var topicFre = []    //[{time, wordCountList: [{topic, count}]}]
    let timeSave = []   //暂存出现过的月份
    var prTopicCount = [];  //最后需要转为列表数组返回
    var prTopic = []    //[{topic, num}]
    let count = 0;

    for(let i = 0; i < designKeyWords.length; i++)
        prTopicCount.push(0);

    while (count++ < 100) {
        const pullBody = await octokit.request(
            "GET /repos/{owner}/{repo}/pulls",
            {
                owner: pytorch,
                repo: pytorch,
                page: count,
                per_page: 100,
                state: "all"
            }
        )
        if (pullBody.data.length == 0)
            break;

        console.log('count is '+ count + '\n');

        //处理一条pr
        for(let i = 0; i < pullBody.data.length; i++)
        {
            let time = pullBody.data[i].created_at.slice(0, 7)
            let detail = pullBody.data[i].labels;   //这个PR的详细label信息
            let isDesign = false;   //判断这个PR是不是设计相关
            // let pr_topic_mouthcount = {};
            // for(let j = 0; j < designKeyWords.length; j++)
            //     pr_topic_mouthcount[designKeyWords[j]] = 0;
            // let wordCountList = {};  //统计在这个pr里，每个设计相关单词分别出现过多少次
            // for(let j = 0; j < designKeyWords.length; j++)
            // {
            //     wordCountList[designKeyWords[j]] = 0;   //初始化,增加每个单词为新的属性并初始化出现次数为0
            // }
            //好像把单词名存成一个属性更好一点
            let wordCountList = [{topic, count}]
            for(let j = 0; j < designKeyWords.length; j++)
            {
                wordCountList.push({topic: designKeyWords[j], count: 0})
            }

            //遍历这个pr的每一个标签，判断与哪些设计词相关
            for(let j = 0; j < detail.length; j++)
            {
                let designRelate = judgeDesign(detail)
                for(let k = 0; k < designRelate.length; k++)
                {
                    if(designRelate[k])
                    {
                        isDesign = true
                        wordCountList[k].count++
                        prTopicCount[k]++
                    }
                }
            }
            if(isDesign)    //该PR是设计相关的
            {
                // if(design_fre[time] == null)
                if(timeSave.includes(time)) //该月份之前出现过
                {
                    let timeIndex = timeSave.indexOf(time);
                    // design_fre[index].
                    designFre[timeIndex].design++
                    for(let j = 0; j < designKeyWords.length; j++)
                    {
                        topicFre[timeIndex].wordCountList[j].count++
                    }
                }
                else    //该月份之前没出现过
                {
                    timeSave.push(time) //存一下这个月份
                    topicFre.push({time:time, wordCountList:wordCountList})  //存一下这个月份的话题数据
                    designFre.push({time:time, design:1, undesign:0});

                }
            }
            else{   //该PR非设计相关的
                if(timeSave.includes(time))
                {
                    let timeIndex = timeSave.indexOf(time)
                    designFre[timeIndex].undesign++;
                }
                else {
                    timeSave.push(time)
                    //话题数据好像都是0就不用存了
                    designFre.push({time: time, design: 0, undesign: 1})
                }
            }
            // if()
            // if(isDesign){
            //     if(design_fre[time] == null)
            //         design_fre[time] = 1
            //     else
            //         design_fre[time]++
            // }
        }
    }
    for(let i = 0; i < prTopicCount.length; i++)
    {
        prTopic.push({topic: designKeyWords[i], num: prTopicCount[i]})
    }
    var ret = {designFre, prTopic, topicFre}
    return ret;
}

function judgeDesign(label){
    var res = [];
    for(let i = 0; i < designKeyWords.length; i++)
    {
        res.push(label.contains(designKeyWords[i]))
    }
    return res;
}

module.exports = {
    DealPullLabels
}