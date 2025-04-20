FROM node:18

WORKDIR /code/
COPY package*.json .
RUN npm install
RUN npm install --save-dev @babel/plugin-proposal-private-property-in-object
COPY ./src ./src
COPY ./public ./public
COPY ./src ./src
COPY ./public ./public
EXPOSE 3000

CMD ["npm", "start"]
