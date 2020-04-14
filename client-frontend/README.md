# Docker commands

## ```docker build -t mihaiburlaciuc/budget-app-client-frontend ```
## ```docker run -p 3000:3000 -it mihaiburlaciuc/budget-app-client-frontend```

## !!! ```stdin_open: true``` must be added to docker-compose in order for the react app not to crash
Source: https://stackoverflow.com/questions/60790440/docker-container-exiting-immediately-after-starting-when-using-npm-init-react-ap

## Issues found during the dev
* Axios gives you the following error if the api does not return a response code between 200 and 300
* props.history.location undefined after pushing a page to history due to double call, once from the main method and the second one from the async then() call
```
Error: Request failed with status code 401
    at createError (createError.js:16)
    at settle (settle.js:17)
    at XMLHttpRequest.handleLoad (xhr.js:61)
```

* RERUN ```docker exec -it f2af5fa4b0ca npm install``` in case a module is not found

* React history is mutable
Link https://github.com/ReactTraining/react-router/blob/master/packages/react-router/docs/api/history.md




# This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

