FROM node:20

WORKDIR /posts-api
COPY package.json .
RUN npm install
COPY . .
CMD npm start