const express = require('express');
const router = express.Router();
const axios = require('axios');

/* GET api listing. */
router.get('/', (req, res) => {
  res.send('api works');
});

/* NewOrders */

router.get('/newOrders', (req, res) => {
    var status=req.params.status
    res.send([]);
});

router.get('/newOrders/:id', (req, res) => {
    //req.params.id
    res.send({});
});

router.delete('/newOrders/:id', (req, res) => {
    res.send({});
});

router.post('/newOrders', (req, res) => {
    res.send({});
});



/*HOA Meetings */

router.get('/hoaMeetings', (req, res) => {
    res.send([]);
});

router.get('/hoaMeetings/potential', (req, res) => {
    res.send([]);
});

router.get('/hoaMeetings/:id', (req, res) => {
    res.send({});
});

router.put('/hoaMeetings/:id/claimed', (req, res) => {
    res.send({});
});

router.put('/hoaMeetings/:id/closed', (req, res) => {
    
    var data = {'approved':req.params.approved}    
    res.send({});
});


module.exports = router;