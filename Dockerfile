FROM node:12.16.1-alpine3.11

# https://nodejs.org/en/docs/guides/nodejs-docker-webapp/
# Create app directory
WORKDIR /app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./

RUN yarn --production

# Bundle app source
COPY . .

CMD [ "yarn", "start" ]
