FROM node:18.13

WORKDIR /app/chat-gateway

COPY . .

RUN npm install

EXPOSE 3013

CMD [ "npm", "run", "start:dev" ]