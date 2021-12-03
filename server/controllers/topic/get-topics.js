const Topic = require('../../models/schemas/topic');

module.exports = async (req, res) => {
	let page = req.query.page || 1;
	let query = {};
	switch(req.query.tab) {
		case 'inquire':
			query.tab = '打听';
			break;
		case 'used':
			query.tab = '二手';
			break;
		case 'part_time_job':
			query.tab = '兼职';
			break;
		case 'gossip':
			query.tab = '瓜田';
			break;
	};
	try {
		let topic = await new Promise((resolve, reject) => {
			Topic.findTopic(query, page, (err, topic) => {
				if (err) {
					reject(err);
				} else {
					resolve(topic);
				}
			});
		});
		res.json({
			errorcode: 0,
			msg: 'successful',
			topic
		});
	} catch (e) {
		res.json({
			errorcode: 555,
			msg: '服务器错误'
		});
	}
};