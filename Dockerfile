# The builder from node image
FROM node:14-alpine as builder

# Move our files into directory name "app"
WORKDIR /app
COPY package.json package-lock.json /app/
RUN cd /app && npm install
COPY . /app

# Build with $env variable from outside
RUN cd /app && npm run build --prod -extract-css false account-ui

# Build a small nginx image with static website
FROM nginx:latest
RUN rm -rf /var/www/html/public/*
COPY .docker/nginx/nginx.conf /etc/nginx/nginx.conf
COPY --from=builder /app/dist /var/www/html/public
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
