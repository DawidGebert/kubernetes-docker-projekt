FROM node AS build-website
WORKDIR /home/node/app
COPY ./package.json ./
COPY ./package-lock.json ./
RUN npm install
COPY ./ ./
ENV REACT_APP_BACKEND_URL="http://localhost:80/api"
RUN npm run build

FROM nginx
COPY --from=build-website /home/node/app/build /usr/share/nginx/html
COPY ./nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
