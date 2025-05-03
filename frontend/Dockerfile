FROM node:18
WORKDIR /code/
COPY package*.json .
RUN npm install
# COPY ./src ./src
# COPY ./public ./public
EXPOSE 3000
ENV CHOKIDAR_USEPOLLING=true
ENV WATCHPACK_POLLING=true


CMD ["npm", "start"]
