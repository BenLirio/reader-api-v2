FROM node
WORKDIR /app
RUN npm i -g nodemon
COPY package*.json .
RUN npm i
COPY ./src ./src
ARG PORT=8080
ENV PORT=$PORT
CMD ["nodemon","src/index.js"]

