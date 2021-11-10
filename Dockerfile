FROM node:16.13-alpine
WORKDIR /usr/src/app
COPY package.json .
COPY yarn.lock .
ARG NODE_ENV
RUN if [ "$NODE_ENV" = "production"]; \
    then yarn install --production; \
    else yarn install; \
    fi
COPY . .
ENV PORT 4000
EXPOSE $PORT
CMD ["node", "index.js"]