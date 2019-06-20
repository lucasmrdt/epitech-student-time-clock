FROM node:11.2.0
RUN mkdir -p /usr/client
WORKDIR /usr/client

COPY . .
RUN npm install
RUN npm install -g serve
RUN npm run pre-build
RUN npm run build

EXPOSE 1235
CMD ["npm", "run", "deploy"]