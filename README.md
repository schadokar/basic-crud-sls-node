# Basic CRUD serverless operation on DynamoDB in Nodejs

This is a simple serverless CRUD application in nodejs.

## Details

- Serverless Computing: AWS Lambda
- Database: AWS DynamoDB
- API: AWS API Gateway
- Serverless CLI: [Serverless Framework](https://serverless.com)

# Prerequisites

1. AWS account
2. Nodejs installed in your machine
3. Install serverless `npm install --global serverless`
4. Basic understanding of nodejs and javascript syntax
5. Configure AWS credentials in serverless

## Configuring AWS credentials in the serverless

Open **IAM** in your AWS account. Create a new user and give **AdministratorAccess**.  
Download the Key pair csv. Save it properly, as if lost there is no way to retrieve it.

> This is an educational project. For production, please configure the user access accordingly.

There are 2 ways configure the AWS credentials in the serverless framework.

### 1. Serverless CLI (local to the machine)

This will configure the AWS credentials to the local instance of the serverless CLI.

To configure run the below command with the correct access key and secret.

```js
serverless config credentials --provider aws --key <ACCESS KEY> --secret <Secret Access key>
```

> Check out this quick tutorial - [Link](https://schadokar.dev/posts/create-your-first-serverless-application/)

### 2. Serverless Web application

Create an account in the [https://serverless.com](https://serverless.com).

Create a new app.

Select **serverless framework** template.  
Enter the app name.

Copy the app properties

```
org: <org-name>
app: <app-name>
```

Open the `serverless.yml` and paste the app properties in the top.

```
org: <org-name>
app: <app-name>
service: basic-sls-crud-service-node
```

Open the terminal in the directory of the serverless project.

Login to serverless account from serverless CLI

```
serverless login
```

**Connect with AWS**

Open the app setting from the serverless dashboard. There is a 3 dots menu in the app card.

Go to **stages** > Select **default** > Connect AWS

You can create multiple stages according to the application environment.

# Deploy the application

To deploy the application run the below command

```
serverless deploy
```

It will create all the API routes configured in the `serverless.yml`.

Test the endpoints using the `curl` command or **Postman**.

# References:

To learn more on serverless [check out my latest tutorials](https://schadokar.dev/categories/serverless/).

---
