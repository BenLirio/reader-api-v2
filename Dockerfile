FROM node
WORKDIR /app
RUN npm i -g nodemon
COPY package*.json .
RUN npm i
COPY ./src ./src
ARG PORT=8080
ENV PORT=$PORT
COPY reader-api-v2-key.json ./
ENV GOOGLE_APPLICATION_CREDENTIALS=./reader-api-v2-key.json
CMD ["nodemon","src/index.js"]

