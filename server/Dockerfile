FROM node:11.2.0
RUN mkdir -p /usr/server
WORKDIR /usr/server

COPY package.json .
RUN npm install

EXPOSE 1234
CMD ["npm", "start"]