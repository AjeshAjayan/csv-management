# Use the official Node.js LTS image
FROM node:20

# Set the working directory
WORKDIR /app

# Copy package.json and yarn.lock to install dependencies
COPY package.json yarn.lock ./
RUN yarn install

# Copy the rest of the application source code
COPY . ./

# Expose the application port
EXPOSE 3000

# Set the default command to start the app
CMD ["yarn", "start"]
