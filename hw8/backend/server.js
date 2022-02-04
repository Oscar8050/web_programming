import WebSocket from 'ws';
import express from 'express'
import mongoose from 'mongoose'
import http from 'http'
import dotenv from "dotenv-defaults";
import Message from "./models/message";
import { sendData, sendStatus, initData } from "./wssConnect";
//import doting from 'doting'
//import {concat} from "ws/lib/buffer-util";

dotenv.config();
mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then((res) => console.log("mongo db connection created"));


const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });
const db = mongoose.connection;
const broadcastMessage = (data, status) => {
    wss.clients.forEach((client) => {
        sendData(data, client);
        sendStatus(status, client);
    });
};
db.once('open', () => {

    wss.on('connection', (ws) => {
        //init?
        initData(ws);
        console.log("wsson connection")
        //console.log(wss.clients);
        ws.onmessage = async (byteString) => {
            const { data } = byteString
            const [task, payload] = JSON.parse(data)

            switch (task) {
                case 'input': {
                    const {name, body} = payload
                    const message = new Message({name, body})
                    try {
                        console.log("save data");
                        await message.save();
                    } catch (e) {
                        throw new Error("message DB save error: " + e);
                    }
                    /*sendData(['output', [payload]], ws)
                    sendStatus({
                        type: 'success',
                        msg: 'Message sent.'
                    }, ws)*/
                    broadcastMessage(['output', [payload]], {
                        type: 'success',
                        msg: 'Message sent.'
                    });
                    break
                }
                case 'clear': {
                    console.log("clear db")
                    Message.deleteMany({}, () => {
                        /*sendData(['cleared'], ws)
                        sendStatus({
                            type: 'info',
                            msg: 'Message cache cleared.'
                        }, ws)*/
                    })
                    console.log("after clear db")
                    broadcastMessage(['cleared', []], {
                        type: 'info',
                        msg: 'Message cache cleared.'
                    });
                    break
                }
                default:
                    break
            }
        }
    })
    const PORT = process.env.PORT || 4000;
    server.listen(PORT, () => {
        console.log(`Server is up in port ${PORT}`)
    })
})

