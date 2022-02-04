import express from 'express'
import {saveSC, deleteDB, queryDB} from "./api";
import bodyParser from "body-parser";
var parseJson = bodyParser.json();

const router = express.Router();
router.post('/api/create-card', parseJson, (req, res) => {
    console.log('create-card');
    console.log(req.body);
    saveSC(req.body.name, req.body.subject, req.body.score);
    let result = [`Adding (${req.body.name}, ${req.body.subject}, ${req.body.score})`,];
    console.log(result);
    res.json( {message: result, card: true})
})

router.get('/api/query-cards', async (req, res) => {
    console.log('query-cards');
    console.log(req.query);
    let result = await queryDB(req.query.type, req.query.queryString);
    console.log(result);
    res.json( {messages: result});

})

router.delete('/api/clear-db', (req, res) => {
    console.log('clear-db');
    deleteDB();
})

export default router;