FROM node:16.3.0-alpine
WORKDIR /app

COPY package*.json ./
COPY . .
RUN npm install
EXPOSE 3000
CMD ["npm", "start"]