import kafka from "./kafkaConfig.ts";

const consumer = kafka.consumer({ groupId: "microservice-group" }); // Consumer group

const consumeMessages = async (
    topic: string,
    handleMessage: (msg: any) => void,
) => {
    await consumer.connect(); // Connect to Kafka
    await consumer.subscribe({ topic, fromBeginning: true }); // Subscribe to topic

    await consumer.run({
        eachMessage: async (
            { topic, partition, message }: {
                topic: string;
                partition: number;
                message: any;
            },
        ) => {
            const parsedMessage = JSON.parse(message.value.toString());
            console.log(`Received message from topic ${topic}:`, parsedMessage);
            handleMessage(parsedMessage); // Process the message
        },
    });
};

export default consumeMessages;
