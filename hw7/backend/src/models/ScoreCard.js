import mongoose from 'mongoose';

const Schema = mongoose.Schema;
const SCSchema = new Schema({
    name: String,
    subject: String,
    score: Number
});
const ScoreCard = mongoose.model('ScoreCard', SCSchema);

export default ScoreCard;
