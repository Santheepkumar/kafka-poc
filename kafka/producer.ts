import kafkaConfig from "./kafkaConfig.ts";

const producer = kafkaConfig.producer();

const sendMessage = async (topic: string, messages: any) => {
    await producer.connect(); // Connect to Kafka
    try {
        await producer.send({
            topic,
            messages: messages.map((msg: any) => ({
                value: JSON.stringify(msg),
            })), // Send messages
        });
        console.log(`Messages sent to topic: ${topic}`);
    } catch (err) {
        console.error("Error sending message:", err);
    } finally {
        await producer.disconnect(); // Disconnect after sending
    }
};

export default sendMessage;
