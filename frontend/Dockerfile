# Build Stage
FROM node:20 AS build
WORKDIR /app

# Copy package.json and yarn.lock to install dependencies
COPY package.json yarn.lock ./
RUN yarn install

# Copy the rest of the React app source code
COPY . ./

# Build the React app
RUN yarn build

# Production Stage
FROM nginx:alpine
WORKDIR /usr/share/nginx/html

# Copy built React app from the build stage
COPY --from=build /app/dist .
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose the default Nginx HTTP port
EXPOSE 80

# Start Nginx server
CMD ["nginx", "-g", "daemon off;"]
