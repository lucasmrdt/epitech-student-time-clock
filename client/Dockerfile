FROM node:11.2.0
RUN mkdir -p /usr/client
WORKDIR /usr/client

COPY . .
RUN apt-get update
RUN apt-get install net-tools
RUN npm install
RUN npm install -g serve
RUN npm run build

EXPOSE 5000
CMD ["npm", "run", "deploy"]