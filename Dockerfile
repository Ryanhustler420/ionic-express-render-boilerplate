FROM node:18-alpine

# Please dont change this here, You can change this via outside
ENV ENV=production 

# Set environment variables
ENV MONGO_URI=mongodb://mongodb:27017
ENV KAFKA_ID=appname
ENV DATABASE=appname
ENV KAFKA_1=kafka:9092
ENV JWT_KEY=something
ENV PORT=8080

WORKDIR /app
COPY package*.json .
COPY client/package.json /client/package.json

RUN npm install

COPY . .

RUN npm install --force --prefix client
RUN npm run build:ci

EXPOSE $PORT
CMD [ "npm", "start" ]