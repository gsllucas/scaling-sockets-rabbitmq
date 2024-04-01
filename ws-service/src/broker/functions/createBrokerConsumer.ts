import { ConsumeMessage } from 'amqplib';
import { rabbitmqBroker } from '../RabbitMQBroker';
import { sleep } from '../../util/sleep';

export interface AMQPConsumerParams {
  queue: string;
  durable: boolean;
  prefetchCount?: number;
}

export async function createAMQPConsumer(
  { queue, durable = true, prefetchCount }: AMQPConsumerParams,
  handler: (payload: ConsumeMessage | null) => void
) {
  const amqpConnection = await rabbitmqBroker.createConnection();
  const channel = await amqpConnection.createChannel();
  await channel.assertQueue(queue, { durable });
  if (prefetchCount) await channel.prefetch(prefetchCount);
  channel.consume(queue, async (p) => {
    handler(p);
    await sleep();
    channel.ack(p!);
  });
}
