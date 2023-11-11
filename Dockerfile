FROM node:18-alpine

# docker build --build-arg DB_USERNAME=secre** --build-arg DB_PASSWORD=secret** -t application .
# docker run -d -p 3000:3000 -e ELSE=something application
ARG DB_USERNAME=username
ARG DB_PASSWORD=password

# Please dont change this here, You can change this via outside
ENV ENV=production 

# Set environment variables
ENV MONGO_URI=mongodb+srv://${DB_USERNAME}:${DB_PASSWORD}@cluster0.4dxvdyw.mongodb.net
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