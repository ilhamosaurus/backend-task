FROM node:18.13

WORKDIR /app/chat-api

COPY . .

RUN npm install

EXPOSE 3000

CMD [ "npm", "run", "start:dev" ]