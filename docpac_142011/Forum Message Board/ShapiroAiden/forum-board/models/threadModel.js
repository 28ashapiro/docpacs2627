const db = require('../database');

function getAllThreads() {
    return db.prepare(`
        SELECT threads.id, threads.title, threads.body, threads.created_at,
               users.id AS user_id, users.username
        FROM threads
        JOIN users ON threads.user_id = users.id
        ORDER BY threads.created_at ASC, threads.id DESC
    `).all();
}

function getThreadById(id) {
    return db.prepare(`
        SELECT threads.id, threads.title, threads.body, threads.created_at,
               users.id AS user_id, users.username
        FROM threads
        JOIN users ON threads.user_id = users.id
        WHERE threads.id = ?
    `).get(id);
}

function createThread(userId, title, body) {
    const result = db.prepare(`
        INSERT INTO threads (user_id, title, body)
        VALUES (?, ?, ?)
    `).run(userId, title, body);

    return result.lastInsertRowid;
}

function getRepliesByThreadId(threadId) {
    return db.prepare(`
        SELECT replies.id, replies.body, replies.created_at,
               users.id AS user_id, users.username
        FROM replies
        JOIN users ON replies.user_id = users.id
        WHERE replies.thread_id = ?
        ORDER BY replies.created_at ASC, replies.id ASC
    `).all(threadId);
}

function createReply(threadId, userId, body) {
    db.prepare(`
        INSERT INTO replies (thread_id, user_id, body)
        VALUES (?, ?, ?)
    `).run(threadId, userId, body);
}

function getUserActivity(userId) {
    const threads = db.prepare(`
        SELECT 'thread' AS post_type, title AS title, body AS body,
               created_at, id AS thread_id
        FROM threads
        WHERE user_id = ?
    `).all(userId);

    const replies = db.prepare(`
        SELECT 'reply' AS post_type, NULL AS title, replies.body AS body,
               replies.created_at, replies.thread_id AS thread_id
        FROM replies
        WHERE user_id = ?
    `).all(userId);

    return threads.concat(replies).sort((a, b) => {
        return new Date(a.created_at) - new Date(b.created_at);
    });
}

module.exports = {
    getAllThreads,
    getThreadById,
    createThread,
    getRepliesByThreadId,
    createReply,
    getUserActivity
};
