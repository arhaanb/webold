import db from '../lib/db-admin';

export default (req, res) => {
	// if (!req.query.id) {
	// 	return res.status(400).json({
	// 		error: 'Missing "id" query parameter'
	// 	});
	// }

	// const ref = db.ref('table').child(req.query.id);
	const ref = db.ref('messages').child(req.query.id)

	// return ref.once('value', (snapshot) => {
	// 	res.status(200).json({
	// 		total: snapshot.val()
	// 	});
	// });

	return ref.once('value', (snapshot) => {
		res.status(200).json({
			// total: snapshot.val()
			stuff: snapshot.val()
		});
	});
};