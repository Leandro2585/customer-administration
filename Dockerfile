FROM node:16

WORKDIR /usr/src/customer_administration_v1

COPY ./package.json .

COPY ./ormconfig.js .
COPY ./.env .
COPY ./tsconfig.json .
COPY ./tsconfig-build.json .

EXPOSE 3333

RUN yarn install --only=prod
