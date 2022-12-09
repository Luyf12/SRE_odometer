const asyncWrapper = require("../middleware/async");
const { createCustomError } = require("../errors/custom-error");
const { Octokit } = require("@octokit/core");
const res = require("express/lib/response");

const octokit = new Octokit({
    auth: `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`,
    //auth可以去https://github.com/settings/tokens生成，上面这个auth是永久的
});

const DesignFrequencySchema = require("../models/designFreq");
const TopicFrequencySchema = require("../models/topicFrequency")
const TopicSchema = require("../models/topic");
const weekDesignFreqSchema = require("../models/weekDesignFreq");
const weekTopicFreqSchema = require("../models/weekTopicFreq")

const designKeyWords = ['code', 'maintain', 'test', 'robust',
    'perform', 'config', 'document', 'clarif'];
const totalCount = [0, 0, 0, 0, 0, 0, 0, 0];

const DealPullLabels = async (owner, name) => {
    console.log('Processing labels now')

    var wordCountList = new Map();
    var weekCountList = new Map();
    var lastTime;
    var thisWeek = null
    var time;
    var fullTime = null;
    var isDesign = 0, nonDesign = 0;
    var weekDesign = 0, weekNonDesign = 0;
    var flag = 1;
    // 这里只统计最近3年的pr，以月份为单位
    for (var i = 0; ; i++) {
        const pullBody = await octokit.request(
            "GET /repos/{owner}/{repo}/pulls",
            {
                owner: owner,
                repo: name,
                page: i,
                per_page: 100,
                state: "all"
            }
        )
        if (pullBody.data.length == 0)
            break;
        // console.log(wordCountList)
        //处理一条pr
        for (let i = 0; i < pullBody.data.length; i++) {
            // 切片如果是(0, 10)则统计的是月的数据，统计周的话更复杂 可以看import-db文件里别人写的
            time = pullBody.data[i].created_at.slice(0, 7)
            fullTime = pullBody.data[i].created_at.slice(0, 10)
            if (lastTime == null)
                lastTime = time;
            if (thisWeek == null)    //记录该周的起始日
            {
                thisWeek = new Date(fullTime)
                thisWeek.setDate(thisWeek.getDate() - 7)  //以最后一日作为该周的结束日期
            }

            if (fullTime < thisWeek) //需要存档当前星期
            {
                await weekDesignFreqSchema.create({
                    time: thisWeek,
                    designed: weekDesign,
                    undesigned: weekNonDesign
                });
                await weekTopicFreqSchema.create({
                    time: thisWeek,
                    topics: await getTopicFre(wordCountList),
                });
                while (fullTime < thisWeek) {
                    thisWeek.setDate(thisWeek.getDate() - 7)
                }
                weekCountList = new Map()
                weekDesign = 0
                weekNonDesign = 0
            }

            if (time != lastTime)    //存档当前月份
            {
                // 存储原来的map和time，然后将map变空
                console.log(lastTime);
                console.log(wordCountList);
                console.log(isDesign)
                console.log(nonDesign)
                console.log(totalCount)

                await DesignFrequencySchema.create({
                    time: lastTime,
                    designed: isDesign,
                    undesigned: nonDesign,
                });
                await TopicFrequencySchema.create({
                    time: lastTime,
                    topics: await getTopicFre(wordCountList),
                });
                lastTime = time
                isDesign = 0
                nonDesign = 0
                wordCountList = new Map();
            }

            // 这里为了保证只取3年数据
            if (time == "2019-12") {
                flag = 0;
                break;
            }

            //处理当前pr
            let detail = pullBody.data[i].labels;   //这个PR的详细label信息
            //遍历这个pr的每一个标签，判断与哪些设计词相关
            for (let j = 0; j < detail.length; j++) {
                let designRelate = judgeDesign(detail[j])
                if (designRelate.length == 0) {
                    nonDesign += 1;
                    weekNonDesign += 1;
                }
                else {
                    isDesign += 1;
                    weekDesign += 1;
                }
                for (let k = 0; k < designRelate.length; k++) {
                    if (designRelate[k]) {
                        for (let p = 0; p < designKeyWords.length; p++) {
                            if (designKeyWords[p] == designRelate[k])
                                totalCount[p] += 1;
                        }
                        if (!wordCountList.has(designRelate[k])) {
                            wordCountList.set(designRelate[k], 1);
                        } else {
                            wordCountList.set(designRelate[k], wordCountList.get(designRelate[k]) + 1);
                        }
                        if(!weekCountList.has(designRelate[k])){
                            weekCountList.set(designRelate[k], 1)
                        }else {
                            weekCountList.set(designRelate[k], weekCountList.get(designRelate[k])+1)
                        }

                    }
                }
            }

        }
        if (flag == 0)
            break;
    }

    for (var i = 0; i < designKeyWords.length; i++) {
        await TopicSchema.create({
            topic: designKeyWords[i],
            num: totalCount[i],
        });
    }
}

function getTopicFre(wordCountList) {
    var result = [];
    for (var i = 0; i < designKeyWords.length; i++) {
        if (wordCountList.has(designKeyWords[i])) {
            var ss = {
                topic: designKeyWords[i],
                num: wordCountList.get(designKeyWords[i])
            };
            result.push(ss)
        }
    }
    return result;
}

function judgeDesign(label) {
    var res = [];
    for (let i = 0; i < designKeyWords.length; i++) {
        if ((String(label.description)).includes(designKeyWords[i]))
            res.push(designKeyWords[i])
    }
    return res;
}

const getDesignFrequency = async (req, res) => {
    try {
        const result = await DesignFrequencySchema.findOne({
            date: req.body.date
        });
        console.log(result);

        res.status(201).json({ result });
    } catch (err) {
        res.status(404).json(err);
    }
};


const getTopicFrequency = async (req, res) => {
    try {
        const result = await TopicFrequencySchema.findOne({
            date: req.body.date
        });

        console.log(result);
        res.status(201).json({ result });
    } catch (err) {
        res.status(404).json(err);
    }
};

const getTopic = async (req, res) => {
    try {
        const result = await TopicSchema.find({});

        console.log(result);
        res.status(201).json({ result });
    } catch (err) {
        res.status(404).json(err);
    }
};

const getWeekTopicFreq = async (req, res) => {
    try {
        const result = await weekTopicFreqSchema.findOne({
            date: req.body.date
        });

        res.status(201).json({ result });
    } catch(err) {
        res.status(404).json(err);
    }
}

const getWeekDesignFreq = async (req, res) => {
    try {
        const result = await weekDesignFreqSchema.findOne({
            date: req.body.date
        })

        res.status(201).json({ result })
    } catch(err){
        res.status(404).json(err)
    }
}

module.exports = {
    DealPullLabels,
    getDesignFrequency,
    getTopicFrequency,
    getTopic,
    getWeekDesignFreq,
    getWeekTopicFreq
}
