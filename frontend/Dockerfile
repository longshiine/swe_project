FROM node:alpine

ARG MODE
ENV MODE=${MODE}
ADD . $MODE
WORKDIR /app

COPY ./src ./
RUN npm install --legacy-peer-deps

EXPOSE 3000
ENTRYPOINT npm run $MODE