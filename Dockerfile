FROM node:20-alpine

WORKDIR /usr/src/app

# Install dependencies based on package lock
COPY package*.json ./
RUN npm install

COPY prisma ./prisma/
RUN npx prisma db push

COPY . .

EXPOSE 3000


CMD ["npm", "run", "dev"]
