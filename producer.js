import { Kafka} from "kafkajs";
import {randomUUID} from "node:crypto";

async function bootstrap(){
  const kafka = new Kafka({
    clientId: 'kafka-producer',
    brokers: ['amusing-ladybug-10879-us1-kafka.upstash.io:9092'],
  sasl: {
    mechanism: 'scram-sha-256',
    username: '***Your_Username***',
    password: '***Your_Password***',
  },
  ssl: true,
  })

  const producer = kafka.producer()
  await producer.connect()
  await producer.send({
    topic: 'notifications.send-notification',
    messages: [
      {
        value: JSON.stringify({
          content: 'Nova notificação.',
          category: 'social',
          recipientId: randomUUID(),
        })
      }
    ]
  })
  await producer.disconnect()
}
bootstrap()

