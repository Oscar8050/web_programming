import ScoreCard from "../models/ScoreCard";

const saveSC = async (name, subject, score) => {
    //const existing = await ScoreCard.findOne({name});
    //if (existing) throw new Error(`data ${name} exists!!`);
    try {
        const newSC = new ScoreCard({name, subject, score});
        console.log("Created new data", newSC);
        return newSC.save();
    } catch (e) { throw new Error("User creation error: " + e); }
};

const deleteDB = async () => {
    try {
        await ScoreCard.deleteMany({});
        console.log("Database Deleted");
    } catch (e) { throw new Error("Database deletion failed"); }
};

const queryDB = async (type, str) => {
    try {
        console.log(type);
        let query = {};
        if (type === "name")
            query = {name: str}
        else
            query = {subject: str}

        const table = await ScoreCard.find(query)//.map(item => {
            //return item//`${item.name} ${item.subject} ${item.score}`;
        //});
        const result = table.map(item => {
            return `Found card with name: (${item.name}, ${item.subject}, ${item.score})`;
        });
        await console.log('1234');
        //await console.log(result);
        return result;
    } catch (e) { };

};

export {saveSC, deleteDB, queryDB};