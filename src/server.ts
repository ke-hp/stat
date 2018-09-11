import * as dotenv from "dotenv";
dotenv.config();
import * as schedule from "node-schedule";
import { db as mongo } from "./mongo/index";
const cronStr = "0 */10 * * * *";
schedule.scheduleJob(cronStr, async () => {
	try {
		console.log("Get data.");
		const time = Date.now();

		const macConnectState = await mongo.mac.aggregate([
			{ $match: { connected: true } },
			{
				$group: {
					_id: "connected_true",
					ac: { $sum: 1 },
					ap: { $sum: "$ap" },
					sta: { $sum: "$sta" },
				},
			},
		]);

		console.log("Get new devices count.");
		await mongo.numStat.create({
		ac: macConnectState[0].ac,
		ap: macConnectState[0].ap,
		sta: macConnectState[0].sta,
		time,
		});
		return;
	} catch (error) {
		console.error(error);
		return;
	}
});

const cronDle = "0 0 0 * * *";
schedule.scheduleJob(cronDle, async () => {
	try {
		console.log("Start delete data.");
		const timestamp = Math.floor(Date.now() / 1000 - 24 * 60 * 60);
		await mongo.sysInfo.deleteMany({
			timestamp: {
				$lt: timestamp,
			},
			topic: {
				$in: ["station", "traffic", "stalist"],
			},
		});

		console.log("Delete old station/traffic/stalist.");
		return;
	} catch (error) {
		console.error(error);
		return;
	}
});

const cronStaGrowth = "1 0 0 * * *";
schedule.scheduleJob(cronStaGrowth, async () => {
	try {
		console.log("Get StaGrowth.");
		const nowData: any = Date.now();
		const oneDayAgo: any = nowData - 1000 * 24 * 60 * 60;
		const todayMaxSta: any = (await mongo.numStat
			.find({
				time: {
					$gt: oneDayAgo,
				},
			})
			.sort({ sta: -1 })
			.limit(1))[0].sta;

		const historyMaxSta: any = (await mongo.numStat
			.find({
				time: {
					$lt: oneDayAgo,
				},
			})
			.sort({ sta: -1 })
			.limit(1))[0].sta;

		const growthNum = todayMaxSta > historyMaxSta ? todayMaxSta - historyMaxSta : 0;
		await mongo.chartData.create({
			num: growthNum,
			time: nowData,
			type: "staGrowth",
		});

		return;
	} catch (error) {
		console.error(error);
		return;
	}
});
