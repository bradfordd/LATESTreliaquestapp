# Getting Started

To run the code, follow the steps below:

1. Ensure you have Node.js installed on your system. If you don't have it, download and install it from https://nodejs.org/en/download/.

2. Install Git if you don't have it already. You can download it from https://git-scm.com/downloads.

3. Open your terminal or command prompt and clone the repository:
```
git clone https://github.com/bradfordd/LATESTreliaquestapp.git
```

4. Navigate to the "reliaquest/backend" directory and install the backend dependencies:
```
cd LATESTreliaquestapp/reliaquest/backend
npm install mongodb express cors dotenv
```

5. Start the server by running the following command in the terminal:
```
npm start
```

6. Open a new terminal or command prompt, navigate to the "reliaquestapp" directory and install the frontend dependencies:
```
cd LATESTreliaquestapp/reliaquestapp
npm install bootstrap react-router-dom
```

7. Start the frontend application by running the following command in the terminal:
```
npm start
```

The backend folder contained in this application contains the JavaScript code that boots up the server. The backend folder also contains all of the APIs that are utilized by the frontend to interact with the database. Within the backend, `config` and `node_modules` are included within the project initialization. `Models` contains the schema for each data object that makes up the database as well as the model for the tokens used in a session. `Routes` within backend contains the APIs associated with each object. `server.js` starts up the server.

Now, the application should be running on your local machine. You can access the frontend by opening a web browser and navigating to http://localhost:3000.

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
