## Building your image

```docker build -t mihaiburlaciuc/budget-app-node .```

List images: ```docker images```

## Run the image
- RUN: 

```docker run -p 49165:8080 -it mihaiburlaciuc/budget-app-node```
- STOP:

```docker ps```

```docker stop <container-id>```
## Logs
``` docker logs <container id>```

## Push changes
```docker push mihaiburlaciuc/budget-app-node:tagname```

## SSH / BASH
```docker exec -it <container name> /bin/bash ```
## Services

### Create docker-compose.yml

Next steps:
- run: 
```
docker-compose build
docker-compose up
```

- verify by using a post req to ```http://localhost:8080/users/signup```

## Add nodemon

## Access bash from container: ```docker exec -it <container name> /bin/bash  ``` 