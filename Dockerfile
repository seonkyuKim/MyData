# The instructions for the first stage
FROM node:10 as builder

ARG NODE_ENV=development
ENV NODE_ENV=${NODE_ENV}

# install another package if you have
# RUN apk --no-cache add python make g++

COPY package.json yarn.lock ./
RUN yarn install

# The instructions for second stage
FROM node:10

WORKDIR /usr/src/app
COPY --from=builder node_modules node_modules

COPY . .

# command for starting production
CMD ["yarn", "run", "start:prod"]