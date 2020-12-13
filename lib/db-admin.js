const admin = require('firebase-admin');

try {
	admin.initializeApp({
		credential: admin.credential.cert({
			client_email: process.env.FIREBASE_CLIENT_EMAIL,
			private_key: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n'),
			project_id: 'realtime-demo-41135'
		}),
		databaseURL: 'https://realtime-demo-41135-default-rtdb.firebaseio.com'
	});
} catch (error) {
	/*
	 * We skip the "already exists" message which is
	 * not an actual error when we're hot-reloading.
	 */
	if (!/already exists/u.test(error.message)) {
		console.error('Firebase admin initialization error', error.stack);
	}
}

module.exports = admin.database();