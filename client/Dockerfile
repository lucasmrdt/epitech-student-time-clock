FROM node:11.2.0
RUN mkdir -p /usr/client
WORKDIR /usr/client

COPY . .
RUN apt-get update
RUN apt-get install net-tools
RUN npm install
RUN npm install -g serve

CMD npm run build && serve -l 5000 -s build
EXPOSE 3000
