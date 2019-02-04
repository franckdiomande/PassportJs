FROM node:alpine

LABEL maintainer="Skyflow - Franck Diomandé <fkdiomande@gmail.com>"

WORKDIR /node

RUN npm init -y
RUN npm install bcryptjs body-parser connect-flash cookie-parser express \
    express-handlebars express-messages express-session express-validator mongodb mongoose \
    passport passport-http passport-local
RUN npm install nodemon -g

EXPOSE 80

CMD ["nodemon", "app.js"]