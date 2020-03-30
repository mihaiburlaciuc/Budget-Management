# MongoDB guideline

## Connect to the container
```docker exec -it <container-name> mongo```
## Run docker container
```sudo docker run -d -p 37017:27017 -v ./data:/data/db mongo```

# Install the MongoDB client
```sudo apt-get install mongodb-clients```

# Change mydb to the name of your DB
```mongo localhost/mydb```

# Other res
link: https://medium.com/@anuradhs/connect-to-mongodb-docker-container-with-authentication-using-mongoose-and-nodejs-6319bea82e9d


