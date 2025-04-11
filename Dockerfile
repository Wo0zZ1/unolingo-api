FROM node:23-bookworm

WORKDIR /usr/src/app

COPY package.json .

RUN yarn

COPY . .

RUN npx prisma generate

RUN yarn build