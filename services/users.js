const db = require('./db');
const helper = require('../helpers');
const config = require('../config');

async function getMultiple(page = 1){
	const offset = helper.getOffSet(page, config.listPerPage);
	const rows = await db.query(
		`SELECT users_id, fullname, username, phone, gender, dob, email FROM users LIMIT ${offset},${config.listPerPage}`
	);
	const data = helper.emptyOrRows(rows);
	const meta = {page};

	return {
		data,
		meta
	}
}

async function issetUsers(username, password){
	const rows = await db.query(
		`SELECT users_id, username, password FROM users WHERE username = '${username}'`
	);

	if(rows.length == 0){
		return {
			"status": false
		}
	}

	return {
		"status": true,
		"password": rows[0].password,
		"users_id": rows[0].users_id
	}

}

module.exports = {
	getMultiple,
	issetUsers
}