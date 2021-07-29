FROM node:14-alpine

RUN mkdir -p /home/node/socket/node_modules && chown -R node:node /home/node/socket

WORKDIR /home/node/socket

COPY package*.json ./

USER node

RUN npm install

COPY --chown=node:node . .

EXPOSE 3010

CMD [ "npm", "run", "start" ]