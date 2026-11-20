const express = require('express');
const threadRouter = express.Router();
const threadModel = require('../models/threadModel');
const { requireLogin } = require('../middleware/authMiddleware');

// NEW THREAD PAGE
threadRouter.get('/new', requireLogin, (req, res) => {
    res.render('newThread', { title: 'New Thread', message: '' });
});

// CREATE A THREAD
threadRouter.post('/', requireLogin, (req, res) => {
    const title = req.body.title;
    const body = req.body.body;

    if (typeof title !== 'string' || title.trim() === '' ||
        typeof body !== 'string' || body.trim() === '') {
        return res.status(400).render('newThread', {
            title: 'New Thread',
            message: 'Please enter a title and message.'
        });
    }

    const threadId = threadModel.createThread(
        req.session.userId,
        title.trim(),
        body.trim()
    );

    res.redirect('/threads/' + threadId);
});

// VIEW ONE THREAD
threadRouter.get('/:id', (req, res) => {
    const threadId = Number(req.params.id);

    if (!Number.isInteger(threadId) || threadId < 1) {
        return res.status(404).render('error', {
            title: 'Not Found', status: 404,
            message: 'That thread could not be found.'
        });
    }

    const thread = threadModel.getThreadById(threadId);

    if (!thread) {
        return res.status(404).render('error', {
            title: 'Not Found', status: 404,
            message: 'That thread could not be found.'
        });
    }

    const replies = threadModel.getRepliesByThreadId(threadId);
    res.render('thread', { title: thread.title, thread, replies, message: '' });
});

// ADD A REPLY!!!!!!!!
threadRouter.post('/:id/replies', requireLogin, (req, res) => {
    const threadId = Number(req.params.id);
    const body = req.body.body;

    if (!Number.isInteger(threadId) || threadId < 1) {
        return res.status(404).render('error', {
            title: 'Not Found', status: 404,
            message: 'That thread could not be found.'
        });
    }

    const thread = threadModel.getThreadById(threadId);

    if (!thread) {
        return res.status(404).render('error', {
            title: 'Not Found', status: 404,
            message: 'That thread could not be found.'
        });
    }

    if (typeof body !== 'string' || body.trim() === '') {
        const replies = threadModel.getRepliesByThreadId(threadId);
        return res.status(400).render('thread', {
            title: thread.title, thread, replies,
            message: 'Reply cannot be empty.'
        });
    }

    threadModel.createReply(threadId, req.session.userId, body.trim());
    res.redirect('/threads/' + threadId);
});

module.exports = threadRouter;
