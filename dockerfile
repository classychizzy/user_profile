FROM node: 16.2.0-alpine3.13
workdir /app
copy package.json ./
RUN npm install
copy . .
expose 3000
CMD ["npm", "run", "start"]