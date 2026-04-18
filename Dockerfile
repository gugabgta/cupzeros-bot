# Use a lightweight Node.js image
FROM node:20-slim

# Create and change to the app directory
WORKDIR /usr/src/app

# Copy package files and install dependencies
COPY package*.json ./
RUN npm install --production

# Copy the rest of the application code
COPY . .

# Run the bot
CMD [ "node", "index.js" ]
