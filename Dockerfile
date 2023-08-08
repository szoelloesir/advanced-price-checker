# Builder image
FROM node:18-alpine3.17 AS builder

# Copy package.json and package-lock.json (if exists) to the container
COPY package.json package-lock.json ./app/

WORKDIR /app

# Install app dependencies using npm
RUN npm install

# Copy the rest of the application files to the container
COPY . .

# Build your Node.js app
RUN npm run build

# Production image
FROM node:18-alpine3.17

# Copy package.json and package-lock.json (if exists) to the container
COPY package.json package-lock.json ./usr/src/app/

WORKDIR /usr/src/app

# Install production app dependencies using npm
RUN npm install --production

# Copy the built app from the builder image to the production image
COPY --from=builder /app/dist/ ./dist/

# Expose the port your Node.js app listens on
EXPOSE 3000

# Define the entrypoint command to start your Node.js app
ENTRYPOINT [ "npm", "start" ]