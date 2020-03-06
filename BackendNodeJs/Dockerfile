# Source: https://nodejs.org/de/docs/guides/nodejs-docker-webapp/
FROM node:10

# Create app directory
WORKDIR /usr/src/app

# Note that, rather than copying the entire working directory,
# we are only copying the package.json file. 
# This allows us to take advantage of cached Docker layers.
# Explanation: http://bitjudo.com/blog/2014/03/13/building-efficient-dockerfiles-node-dot-js/
#
# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./

RUN npm Install

# Bundle app source
COPY . .

EXPOSE 8080

CMD [ "node", "server.js" ]