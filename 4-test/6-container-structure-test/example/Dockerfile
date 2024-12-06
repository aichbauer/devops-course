# Use the official Node.js image as the base image
FROM node:20.2.0

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json (if available) into the working directory
COPY package*.json ./

# Install dependencies
RUN npm install --production

# Copy the application code into the container
COPY . .

# Expose the port the Fastify app runs on
EXPOSE 3000

# Set the command to start the Fastify application
CMD ["node", "src/server.js"]
