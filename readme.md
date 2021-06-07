# Github Stats application

## Screenshots

![image](https://user-images.githubusercontent.com/26196076/121059449-1c380580-c7df-11eb-8293-6e84038cbc11.png)

![image](https://user-images.githubusercontent.com/26196076/121059806-83ee5080-c7df-11eb-8ccc-0078ba907546.png)

## Local Setup

- **Frontend**

1. Rename .env.example with .env

```sh
  yarn add
  yarn start
```

- **Backend**

1. Rename .env.example with .env
2. Create a Github personal access [token](https://docs.github.com/en/github/authenticating-to-github/keeping-your-account-and-data-secure/creating-a-personal-access-token)
3. Paste access token in .env file
4. Create a MongoDB collection
5. Replace <YOUR_DB> with the collection name in .env file

```sh
npm i
npm run start
```

Tech Stack

- Frontend

  - React + Typescript
  - Bootstrap

- Backend
  - NodeJS + Typescript
  - MongoDB
  - Express
  - Github API
