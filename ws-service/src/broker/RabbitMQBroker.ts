import amqp from 'amqplib';

export class RabbitMQBroker {
  constructor() {}

  async createConnection(vhost?: string): Promise<amqp.Connection> {
    const connection = await amqp.connect({
      hostname: process.env.RABBITMQ_HOST,
      username: process.env.RABBITMQ_USER,
      password: process.env.RABBITMQ_PASSWORD,
      port: Number(process.env.RABBITMQ_PORT),
      vhost,
    });
    return connection;
  }
}

const rabbitmqBroker = new RabbitMQBroker();
export { rabbitmqBroker };
