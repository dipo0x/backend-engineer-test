# Backend Engineer Test

### Introduction
This is a RESTful API built using Typescript, ExpressJS and MongoDB.

### Setup

Clone the repository to your local machine.

```bash
git clone https://github.com/dipo0x/backend-engineer-test
```
Ensure that you have Typescript and MongoDB installed on your machine. You could also use MongoDB Atlas.
Navigate to the root directory of the project in a terminal.

```bash
cd backend-engineer-test
```

Run the following command to install the necessary dependencies

```bash
yarn install
```

Add a .env file following .env.example file example with the values of each variable

```.env
PORT
MONGODB_URI
ACCESS_TOKEN_EXPIRES_IN
ACCESS_TOKEN_PRIVATE_KEY
```

</br>


### Running Server

#### Locally

Run the following command to start the server:

```bash
npm run dev
```

The server will run on http://localhost:(the-port-you-have-set-in-your-ENV)

</br>


### Conclusion

You can find additional documentation for this API, including request and response signatures, by visiting https://documenter.getpostman.com/view/17975360/2sAYX2PQ3A in your web browser.
