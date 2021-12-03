const Topic = require('../../models/schemas/topic');

module.exports = async (req, res) => {
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
		let count = await new Promise((resolve, reject) => {
			Topic
			.count(query)
			.exec((err, count) => {
				if (err) {
					reject(err);
				} else {
					resolve(count);
				}
			});
		});
		res.json({
			count,
			errorcode: 0,
			msg: 'successful'
		});
	} catch (e) {
		res.json({
			errorcode: 555,
			msg: '服务器错误' 
		});
	}
};