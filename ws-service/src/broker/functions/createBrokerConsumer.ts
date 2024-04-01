import { ConsumeMessage, Options } from 'amqplib';
import { rabbitmqBroker } from '../RabbitMQBroker';
import { sleep } from '../../util/sleep';

export interface AMQPConsumerParams {
  queue: string;
  options?: Options.AssertQueue;
  prefetchCount?: number;
}

export async function createAMQPConsumer(
  { queue, options, prefetchCount }: AMQPConsumerParams,
  handler: (payload: ConsumeMessage | null) => void
) {
  const amqpConnection = await rabbitmqBroker.createConnection();
  const channel = await amqpConnection.createChannel();
  await channel.assertQueue(queue, { ...options });
  if (prefetchCount) await channel.prefetch(prefetchCount);
  channel.consume(queue, async (p) => {
    handler(p);
    await sleep();
    channel.ack(p!);
  });
}
