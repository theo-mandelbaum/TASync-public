FROM node:18

WORKDIR /code/
COPY package*.json .
RUN npm install
RUN npm install @syncfusion/ej2-react-buttons \
                @syncfusion/ej2-react-calendars \
                @syncfusion/ej2-react-dropdowns \
                @syncfusion/ej2-react-inputs \
                @syncfusion/ej2-react-navigations \
                @syncfusion/ej2-react-schedule \
                @syncfusion/ej2-react-splitbuttons \
                @syncfusion/ej2-base \
                @syncfusion/ej2-data \
                moment-timezone
RUN npm install --save-dev @babel/plugin-proposal-private-property-in-object
COPY ./src ./src
COPY ./public ./public
EXPOSE 3000

CMD ["npm", "start"]