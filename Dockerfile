FROM node:16.15-slim AS build

WORKDIR /home/node/app

RUN apt-get update

RUN apt-get install -y libssl-dev

USER node

EXPOSE 3000

CMD ["tail", "-f", "/dev/null"]