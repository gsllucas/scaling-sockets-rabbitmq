# Overview

This a proof of concept to escalate websockets application with messaging broker.

It is divided in 3 core application as below:

- ws-service: service that has a messaging broker consumer that listens to that queue to send a socket event
- ws-client: service that has a socket client to listen to socket events emitted by a queue event
- broker-publisher: servicer that is emitting events through a messaging broker publisher

## Instalação

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
