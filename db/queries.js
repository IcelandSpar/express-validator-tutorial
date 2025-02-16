const pool = require('./pool');

async function getUsers() {
    const { rows } = await pool.query("SELECT * FROM users");
    return rows;
}

async function insertUserInfo(userInfo) {
    await pool.query("INSERT INTO users (first_name, last_name, email, age, bio) VALUES ($1, $2, $3, $4, $5)", userInfo)
}

async function getSearch(search) {
    const { rows } = await pool.query("SELECT * FROM users WHERE CONCAT(first_name, last_name) ILIKE $1", [`%${search}%`]);
    return rows;
}

async function deleteUser(id) {
    await pool.query("DELETE FROM users WHERE id=$1", [id])
}

async function updateUserInfo(updatedUserInfo) {
    await pool.query("UPDATE users SET first_name=$2, last_name=$3, email=$4, age=$5, bio=$6 WHERE id=$1;", updatedUserInfo)
}

async function getUser(id) {
    const {rows} = await pool.query("SELECT * FROM users WHERE id=$1", [id]);
    return rows;
}

module.exports = {
    getUsers,
    insertUserInfo,
    getSearch,
    deleteUser,
    updateUserInfo,
    getUser,
}