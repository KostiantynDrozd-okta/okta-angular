FROM node:14.15.0-alpine3.10

RUN npm install -g @angular/cli
RUN npm install @angular/core
ADD . / okta-angular/

RUN ls -a

WORKDIR okta-angular
RUN ls -a

RUN yarn install
RUN ls -a

RUN yarn build
RUN ls -a

RUN yarn link

WORKDIR ../

RUN node -v

RUN npm i rxjs
RUN npm install @angular/router
RUN npm i @angular/common

WORKDIR ../
RUN ls -a

RUN ng new okta-app --routing
RUN npm install @okta/okta-signin-widget
RUN ls -a
WORKDIR okta-app

RUN yarn link "@okta/okta-angular"
#RUN npm install @okta/okta-angular

COPY /test/selenium-test/sign-in-widget/app.module.ts /okta-app/src/app
COPY /test/selenium-test/sign-in-widget/app.component.html /okta-app/src/app
COPY /test/selenium-test/sign-in-widget/app.component.ts /okta-app/src/app
COPY /test/selenium-test/sign-in-widget/protected.component.ts /okta-app/src/app
COPY /test/selenium-test/sign-in-widget/login.component.ts /okta-app/src/app
