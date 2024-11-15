import { Kafka } from "kafkajs";

const kafka = new Kafka({
    clientId: "kk-app", // Unique identifier for this service
    brokers: ["0.0.0.0:9092", "0.0.0.0:9093", "0.0.0.0:9094"], // Kafka brokers
});

export default kafka;
