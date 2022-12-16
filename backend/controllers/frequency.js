//返回和时间有关的信息
const FrequencySchema = require("../models/frequency");

const res = require("express/lib/response");

//返回按年、月、周统计的时间数据,包括star,commit,issue
const GetFrequency = async (req,res) => {
    try {
        const repo = await FrequencySchema.findOne({
            owner: req.body.owner,
            name: req.body.name
        });
        const data = {
            star_frequency: repo.star_frequency,
            commit_frequency: repo.commit_frequency,
            issue_frequency: repo.issue_frequency
        };
        console.log(data);
        res.status(201).json(data);
    } catch (err) {
        console.log(err);
        res.status(404).json(err);
    }
} 

// 返回核心用户
const GetCoreUsers = async (req, res) => {
    try {
        const repo = await FrequencySchema.findOne({
            owner: req.body.owner,
            name: req.body.name
        });

        const data = {
            committers: repo.committers,
            pullers: repo.pullers,
        }
        console.log(data);
        res.status(201).json(data);

    } catch (err) {
        console.log(err);
        res.status(404).json(err);
    }
}
module.exports = {
    GetFrequency,
    GetCoreUsers
};