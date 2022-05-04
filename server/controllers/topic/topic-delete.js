const User = require('../../models/schemas/user');
const Topic = require('../../models/schemas/topic');
module.exports = async(req, res) => {
	let _topic_id = req.body._id;
    console.log("请求id", _topic_id);
    // let topic = await new Promise((resolve, reject) => {
    //     Topic.findById(_topic_id).update({
    //         visible: false
    //     }).exec((err, topic) => {
    //         if (err) {
    //             reject(err);
    //         } else {
    //             resolve(topic);
    //         }
    //     });
    // });

    try {
		await new Promise((resolve, reject) => {
			Topic.remove({_id: _topic_id},function(err){
                if(!err){
                     console.log("修改成功")
                 } 
             })
		});
		res.json({
			errorcode: 0,
			msg: 'successful'
		});
	} catch (e) {
		res.json({
			errorcode: 555,
			msg: '服务器错误'
		});
	}

    // try {
    //     let topic = await new Promise((resolve, reject) => {
    //         Topic.findOne({
    //             _topic_id
    //         }).exec((err, topic) => {
    //             if (err) {
	// 				reject(err);
	// 				console.log(err);
	// 			} else {
	// 				resolve(topic);
	// 			}
    //         });
    //     });
    //     try {
    //         await new Promise((resolve, reject) => {
    //             Topic.update({
    //                 userName
    //             }, {
    //                 email: _user.email,
    //                 signature: _user.signature
    //             }).exec((err) => {
    //                 if (err) {
    //                     reject(err);
    //                 } else {
    //                     resolve();
    //                 }
    
    //             })
    //         });
    //         res.json({
    //             errorcode: 0,
    //             msg: 'successful'
    //         });
    //     } catch {

    //     }
    // } catch {

    // }

};