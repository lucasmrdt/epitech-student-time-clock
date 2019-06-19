FROM node:11.2.0
RUN mkdir -p /usr/client
WORKDIR /usr/client

COPY package.json .
RUN npm install

EXPOSE 1235
CMD ["npm", "start"]