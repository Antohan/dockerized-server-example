FROM node:16.13-alpine
WORKDIR /usr/src/app
COPY package.json .
COPY yarn.lock .
RUN yarn install
COPY . .
ENV PORT 4000
EXPOSE $PORT
CMD ["yarn", "start"]