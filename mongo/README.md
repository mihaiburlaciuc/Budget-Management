# MongoDB guideline

## Connect to the container
```docker exec -it <container-name> mongo```
## Run docker container
```sudo docker run -d -p 37017:27017 -v ./data:/data/db mongo```

# Install the MongoDB client
```sudo apt-get install mongodb-clients```

# Change mydb to the name of your DB
```mongo localhost/mydb```

# Usefull
```
docker exec -it budgetapp_mongo_1 bash
show dbs
use budgetDB
show collections
db.users.find()
```
# Docker-machine

```
docker-machine ls
docker-machine start <machine name>
# get ip form ls
docker-machine ssh myvm1 "docker swarm init --advertise-addr 192.168.99.100"
docker-machine ssh myvm2 "docker swarm join --token SWMTKN-1-4hd41nyin8kn1wx4bscnnt3e98xtlvyxw578qwxijw65jp1a3q32rl6525xriofd5xmv0c1k5vj 192.168.99.100:2377"

docker-machine ssh myvm1 "docker node ls"

docker-machine scp docker-compose.yml myvm1:.

// deploy app
docker-machine ssh myvm1 "docker stack deploy -c docker-compose.yml testapp_name"

docker-machine ssh myvm1 "docker stack ps testapp_name"

// rm app
docker-machine ssh myvm1 "docker stack rm testapp_name"

$ docker-machine ssh myvm2 "docker swarm leave"
$ docker-machine ssh myvm1 "docker swarm leave --force"

```
# Invalid mounting config error: 
"invalid mount config for type…" 

- caused by: 
> If you bind mount a host path into your service’s containers, the path must exist on every swarm node. The Docker swarm mode scheduler can schedule containers on any machine that meets resource availability requirements and satisfies all constraints and placement preferences you specify.
- solution: copy in both vms the folders that are a volume
# Other res
link: https://medium.com/@anuradhs/connect-to-mongodb-docker-container-with-authentication-using-mongoose-and-nodejs-6319bea82e9d


