import Message from "./models/message";

const sendData = (data, ws) => {
    ws.send(JSON.stringify(data));
}

const sendStatus = (payload, ws) => {
    sendData(["status", payload], ws);
}

const initData = (ws) => {
    Message.find().sort({ created_at: -1}).limit(100)
        .exec((err, res) => {
            //console.log("get old message")
            if (err) throw err
            console.log("going to send old message")
            console.log(res);
            sendData(["init", res], ws)
            console.log('after send old message')
        })
}

export { sendData, sendStatus, initData }