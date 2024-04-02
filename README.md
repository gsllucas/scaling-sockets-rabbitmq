# Overview

This a proof of concept to escalate websockets application with messaging broker.

It is divided in 3 core application as below:

- ws-service: service that has a messaging broker consumer that listens to a queue to send a custom socket event according to necessity
- ws-client: service that has a socket client to listen to socket events emitted by a queue event
- broker-publisher: servicer that is emitting events through a messaging broker publisher

Any another service can use ws-service to send real time messages in socket through a messaging broker publisher (rabbitMQ chosen here).

## Instalação

> It's recommended to use node version > v16.x

1. Install dependencies

```
cd ws-service && npm install && cd ../ws-client && npm install && cd ../broker-publisher && npm install
```

2. Run docker-compose

```
docker-compose up -d --build
```

3. Open 3 terminals

Run `npm run start` in each folder

## Observations

Publisher sending payload must follow types as below:

.ts file

```

interface PublishPayloadOptions {
  socketChannel: string; // this is rescued in ws-service to send to the web socket channel
  data: any; // payload to send to socket channel, so socket listeners can consumes it
}

JSON.stringify({
    socketChannel: 'socket:channel_name',
    data: { message: 'Message sent by broker-publisher', value },
})
```
