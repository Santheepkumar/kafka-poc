import express, { Request, Response } from "express";
import sendMessage from "./kafka/producer.ts";
import consumeMessages from "./kafka/consumer.ts";
import { EMAIL } from "./kafka/topics.ts";

export function add(a: number, b: number): number {
    return a + b;
}

const app = express();
app.use(express.json());

app.post("/publish", async (req: Request, res: Response) => {
    const { topic, message } = req.body;
    try {
        await sendMessage(topic, [message]);
        res.status(200).send("Message published successfully");
    } catch (err) {
        res.status(500).send("Error publishing message");
    }
});

consumeMessages(EMAIL, (message) => {
    console.log("email processing", message);
});

app.listen(3001, () => console.log("App running on port 3001"));
