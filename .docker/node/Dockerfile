FROM node:14

WORKDIR /dist
# clear cache
RUN npm cache clean --force
# install dependency
RUN npm install
# build app
RUN npm run build --prod
