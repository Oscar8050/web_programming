import express from 'express'
import {getNumber, genNumber} from "../core/getNumber";

const router = express.Router()
router.post('/start', (_, res) => {
    genNumber()
    res.json({ msg: 'The game has started.' })
})
router.get('/guess', (req, res) => {
    const number = getNumber()
    const guessed = parseInt(req.query.number, 10)
    if (!guessed || guessed < 1 || guessed > 100) {
        res.status(406).send({ msg: 'Not a legal number.' })
    } else if (number === guessed) {
        res.json( { msg: 'Equal' })

    } else {
        if (number < guessed)
            res.json( { msg: 'Smaller' })
        else
            res.json( { msg: 'Larger' })
    }
})

router.post('/restart', (_, res) => {
    genNumber()
    res.json( { msg: 'The game has started.' })
})
export default router