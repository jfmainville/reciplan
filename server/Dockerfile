FROM node:12-alpine3.14
WORKDIR /app
COPY package.json /app/package.json
RUN npm install --silent
COPY . .
EXPOSE 3000
CMD ["npm", "start"]