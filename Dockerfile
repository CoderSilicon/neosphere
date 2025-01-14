# Use the official Node.js image as the base
FROM node:current-alpine3.20

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm build

# Copy the rest of the application code
COPY . .

# Build the application
RUN npm install

# Expose the port the app runs on
EXPOSE 8080

# Start the Next.js application
CMD ["npm", "start"]
