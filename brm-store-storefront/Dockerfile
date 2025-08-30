# Development Dockerfile for Medusa
FROM node:20-alpine

# Set working directory
WORKDIR /app

# Copy package files and npm config
COPY package.json package-lock.json ./

# Install all dependencies using npm
RUN npm ci

# Copy source code
COPY . .

# Expose the port Medusa runs on
EXPOSE 8000

# Start with migrations and then the development server
CMD ["npm", "run", "dev"]
