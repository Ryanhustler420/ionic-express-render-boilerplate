# Appname

🔗 [Website](https://appname.onrender.com)

Your description

### Requirement

Create these branches: `master`, `stage`, `prod`

[Render](https://render.com) profile

| email             | method | Service | Image        |
| ----------------- | ------ | ------- | ------------ |
| example@gmail.com | github | Docker  | repo/appname |

[Docker](https://hub.docker.com) profile

| username | method |
| -------- | ------ |
| repo     | email  |

[Cronjobs](https://cron-job.org/)

| username         | method |
| ---------------- | ------ |
| example@test.com | email  |

[Firebase](https://console.firebase.google.com/)

| email            | project |
| ---------------- | ------- |
| example@test.com | appname |

### Repository Env

- RENDER_SERVER_HOST_URL: `https://abc-xyz.onrender.com`
- RENDER_APP_SERVICE_ID: `srv-cgnlgo61101c73al966g`
- RENDER_PROFILE_AUTH_API_TOKEN: `rnd_xkQiKV...`
- DOCKER_IMAGE_NAME: `prof/app:latest`
- DOCKER_PASSWORD: `admin123`
- DOCKER_USERNAME: `user69`
- SLACK_WEBHOOK_URL: `https://something`

### Application Env

- FIREBASE_CLIENT_EMAIL: `firebase-adminsdk-dsdsdsd@librarysoftware-asdasd.iam.gserviceaccount.com`
- FIREBASE_PRIVATE_KEY: `-----BEGIN_PRIVATE_KEY-----\acdsddsd=\n-----END_PRIVATE_KEY-----\n`
- FIREBASE_PROJECT_ID: `appname`
- MONGO_URI: `mongodb+srv://${DB_USERNAME}:${DB_PASSWORD}@cluster0.xyz.mongodb.net`
- KAFKA_ID: `appname`
- DATABASE: `appname`
- KAFKA_1: `kafka:9092`
- JWT_KEY: `something`
- PORT: `8080`

### Docker Build Args

> docker build --build-arg MONGODB_USERNAME=username --build-arg MONGODB_PASSWORD=secret ... -t appname .

- MONGODB_USERNAME: `username`
- MONGODB_PASSWORD: `password`
- FIREBASE_PROJECT_ID=`appname`
- FIREBASE_PRIVATE_KEY=`-----BEGIN_PRIVATE_KEY-----\acdsddsd=\n-----END_PRIVATE_KEY-----\n`
- FIREBASE_CLIENT_EMAIL=`firebase-adminsdk-dsdsdsd@librarysoftware-asdasd.iam.gserviceaccount.com`

### Important

- It wakes up the render server
- It has three stage
  - ci [skip ci]
  - stage
  - prod

### Firebase Setup

- Create a project
- Generate a new private key
- Copy the code from downloaded file and place inside firebase.json file

### Mongodb Atlas Setup

- Create cluster
- Create index on collection
- Do whatever else you want to do

### Todo

- Improve the app workflows
