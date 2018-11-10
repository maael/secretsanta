FROM node:8-alpine

LABEL MAINTAINER="Matthew Elphick <matt.a.elphy@gmail.com>"

WORKDIR /app

ADD . /app

RUN rm -f /app/.env

RUN yarn install

RUN yarn build

RUN yarn cache clean \
  && rm -rf node_modules \
  && yarn install --production

CMD ["yarn", "start"]
