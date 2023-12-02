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

### Workflow Env

- MONGO_URI: `something`
- FIREBASE_SA: `{}`
- RENDER_SERVER_HOST_URL: `https://abc-xyz.onrender.com`
- RENDER_APP_SERVICE_ID: `srv-cgnlgo61101c73al966g`
- RENDER_PROFILE_AUTH_API_TOKEN: `rnd_xkQiKV...`
- DOCKER_IMAGE_NAME: `prof/app:latest`
- DOCKER_PASSWORD: `admin123`
- DOCKER_USERNAME: `user69`
- SLACK_WEBHOOK_URL: `https://something`
- NETLIFY_AUTH_TOKEN?: `something`
- NETLIFY_SITE_ID?: `something`

### Docker Build Args

> docker build -t "${{ secrets.DOCKER_IMAGE_NAME }}" . --build-arg MONGO_URI="${{ secrets.MONGO_URI }}" --build-arg FIREBASE_SA="${{ secrets.FIREBASE_SA }}"

- FIREBASE_SA: `{}`
- NODE_ENV: `production`
- MONGO_URI: `mongodb+srv://username:password@cluster0.4dxvdyw.mongodb.net`

### Application Env

- FIREBASE_SA: `${FIREBASE_SA}`
- KAFKA_ID: `appname`
- DATABASE: `appname`
- MONGO_URI: `${MONGO_URI}`
- KAFKA_1: `kafka:9092`
- JWT_KEY: `something`
- PORT: `8080`

### Important

- It wakes up the render server
- It has three stage
  - ci [skip ci]
  - stage
  - prod

### Firebase Setup

- Create a project
- Generate a new private key
- Copy the entire json content and stringify that and place inside .env file. NOTE: replace **'\\\n' to '\n'**

```bash
https://jsonformatter.org/json-stringify-online

- replace all \\n  -> \n
- replace all \r\n -> empty

- set FIREBASE_SA="{ \"type\": \"service_account\", \"universe_domain\": \"googleapis.com\"}"
```

### Mongodb Atlas Setup

- Create cluster
- Create index on collection
- Do whatever else you want to do

### CICD Process

- push the code
- add the repo secrets
- set null to all secrets which has no value just yet
- run manual deploy publish workflow
- get the render details
- update the repo secrets

### Render Issue

- [Add Custom Domain](https://community.render.com/t/what-could-cause-the-certificate-pending-for-the-new-custom-domain/1091/2)

### Todo

- Improve the app workflows
