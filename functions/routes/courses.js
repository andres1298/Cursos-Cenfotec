'use strict';

const express = require('express');
const functions = require('firebase-functions');
const router = express.Router();
const admin = require('firebase-admin');
const db = admin.firestore();

router.post('/courses/create', (req, res) => {
    (async () => {
        await db.collection('courses').doc(req.body.code)
            .create(
                {
                    name: req.body.name,
                    credits: req.body.credits,
                    cost: req.body.cost
                }
            )
            .then(() => res.status(200).send({ message: 'Course created' }))
            .catch((error) => res.status(500).send(error))
    })();
});

router.get('/courses/read/:course_id', (req, res) => {
    (async () => {
        const document = db.collection('courses').doc(req.params.course_id);
        await document.get()
            .then((querySnapshot) => res.status(200).send(querySnapshot.data()))
            .catch((error) => res.status(500).send(error))
    })();
});

router.get('/courses/read', (req, res) => {
    (async () => {
        const collection = db.collection('courses');
        const response = [];
        await collection.get()
            .then(querySnapshot => {
                querySnapshot.docs.forEach(doc => {
                    const data = {
                        id: doc.id,
                        ...doc.data()
                    }
                    response.push(data);
                })
            })
            .then(() => res.status(200).send(response))
            .catch((error) => res.status(500).send(error))
    })();
});

router.put('/courses/update/:course_id', (req, res) => {
    (async () => {
        const document = db.collection('courses').doc(req.params.course_id);
        await document.update({
            name: req.body.name,
            credits: req.body.credits,
            cost: req.body.cost
        })
            .then(() => res.status(200).send({ message: 'Course updated' }))
            .catch((error) => res.status(500).send(error))
    })();
});

router.delete('/courses/delete/:course_id', (req, res) => {
    (async () => {
        const document = db.collection('courses').doc(req.params.course_id);
        await document.delete()
            .then(() => res.status(200).send({ message: 'Course deleted' }))
            .catch((error) => res.status(500).send(error))
    })();
});

module.exports = router;

