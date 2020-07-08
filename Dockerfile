FROM node:10-alpine AS build
WORKDIR /usr/src/app
COPY package.json .
RUN npm install
COPY . .
RUN npx tsc -p ./tsconfig.json
RUN rm -rf ./node_modules

FROM node:10-alpine
WORKDIR /usr/src/app
COPY package.json .
RUN npm install --only=production
COPY --from=build /usr/src/app/build build
EXPOSE 4000
CMD ["node", "./build/app.js"]
