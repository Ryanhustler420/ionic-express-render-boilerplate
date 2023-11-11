FROM node:18-alpine

# docker build --build-arg DB_USERNAME=secre** --build-arg DB_PASSWORD=secret** -t application .
# docker run -d -p 3000:3000 -e ELSE=something application
ARG DB_USERNAME=username
ARG DB_PASSWORD=password
ARG FIREBASE_CLIENT_EMAIL=firebase-adminsdk-dsdsdsd@librarysoftware-asdasd.iam.gserviceaccount.com
ARG FIREBASE_PRIVATE_KEY=-----BEGIN_PRIVATE_KEY-----\acdsddsd=\n-----END_PRIVATE_KEY-----\n
ARG FIREBASE_PROJECT_ID=socket-polling

# Please dont change this here, You can change this via outside
ENV ENV=production 

# Set environment variables
ENV MONGO_URI=mongodb+srv://${DB_USERNAME}:${DB_PASSWORD}@cluster0.4dxvdyw.mongodb.net
ENV FIREBASE_CLIENT_EMAIL=${FIREBASE_CLIENT_EMAIL}
ENV FIREBASE_PRIVATE_KEY=${FIREBASE_PRIVATE_KEY}
ENV FIREBASE_PROJECT_ID=${FIREBASE_PROJECT_ID}
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