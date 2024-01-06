# Appname

Your description

### Requirement

Create these branches: `master`, `stage`, `production`

## **[Docker](https://hub.docker.com)** profile

| username  | Password           | Image(s)                     |
| --------- | ------------------ | ---------------------------- |
| Myname123 | SomethingSomething | myname123/appname-stage      |
| Myname456 | SomethingSomething | myname456/appname-production |

## **[Render](https://render.com)** profile

| email               | Password           | Image                        |
| ------------------- | ------------------ | ---------------------------- |
| Myname123@domain.me | SomethingSomething | myname123/appname-stage      |
| Myname456@domain.me | SomethingSomething | myname456/appname-production |

## **[MongoDB](https://www.mongodb.com)** profile

> **Allow Access From Anywhere**

| email               | Password           | Database   |
| ------------------- | ------------------ | ---------- |
| Myname123@domain.me | SomethingSomething | Stage      |
| Myname456@domain.me | SomethingSomething | Production |

## Workflow Env

> You can pre create these, since these details are not tighly coupled with this repository

- WF\_<span style="color:lightblue;">**DISCORD**</span>\_WEBHOOK_URL : `null`
- WF\_<span style="color:red;">**DOCKER**</span>\_STAGE_ACCOUNT_USERNAME : `myname123`
- WF\_<span style="color:red;">**DOCKER**</span>\_STAGE_ACCOUNT_PASSWORD : `SomethingSomething`
- WF\_<span style="color:red;">**DOCKER**</span>\_STAGE_IMAGE_NAME : `myname123/appname-stage`
- WF\_<span style="color:red;">**DOCKER**</span>\_PRODUCTION_ACCOUNT_USERNAME : `myname456`
- WF\_<span style="color:red;">**DOCKER**</span>\_PRODUCTION_ACCOUNT_PASSWORD : `SomethingSomething`
- WF\_<span style="color:red;">**DOCKER**</span>\_PRODUCTION_IMAGE_NAME : `myname456/appname-production`
- WF\_<span style="color:yellow;">**MONGODB**</span>\_STAGE_DATABASE_NAME : `appname-stage`
- WF\_<span style="color:yellow;">**MONGODB**</span>\_PRODUCTION_DATABASE_NAME : `appname-production`
- WF\_<span style="color:yellow;">**MONGODB**</span>\_PRODUCTION_URI : `mongodb+srv://username:<password>@cluster0.production.mongodb.net`
- WF\_<span style="color:yellow;">**MONGODB**</span>\_STAGE_URI : `mongodb+srv://username:<password>@cluster0.stage.mongodb.net`
- WF\_<span style="color:green;">**ADMIN_PASSWORD**</span>\_STAGE : `Phpmyadmin920@`
- WF\_<span style="color:green;">**ADMIN_PASSWORD**</span>\_PRODUCTION : `Phpmyadmin920@`

> Once you have docker image on dockerhub

- WF\_<span style="color:green;">**RENDER**</span>\_STAGE_APP_SERVICE_ID : `null`
- WF\_<span style="color:green;">**RENDER**</span>\_PRODUCTION_APP_SERVICE_ID : `null`
- WF\_<span style="color:green;">**RENDER**</span>\_STAGE_PROFILE_AUTH_API_TOKEN : `null`
- WF\_<span style="color:green;">**RENDER**</span>\_PRODUCTION_PROFILE_AUTH_API_TOKEN : `null`

## Keep in mind

- Update your repository secrets
- Make your mongodb accessed from anywhere
- Make your docker image private once they published
- Use lower case for login and building docker images

### Rollback

- Todo
