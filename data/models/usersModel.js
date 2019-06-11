const db = require('../dbConfig');


module.exports = {
    find,
    findBy,
    findById,
    addUser
}

function find() {
    return db('users')
        .select('id', 'username', 'password');
}

function findBy(filter) {
    return db('users')
        .where(filter);
}

function findById(id) {
    return db('users')
        .where({ id })
        .first();
}

function addUser(user) {
    return db('users')
        .insert(user, 'id')
        .then(ids => {
            const [id] = ids;
            return findById(id);
        });
}