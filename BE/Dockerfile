# Set the base image
FROM node:18.16

# Set the working directory
WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 4800

# Use argument for different build stages
ARG NODE_ENV=production

# Use environment variable
ENV NODE_ENV=${NODE_ENV}

# Run the application
# CMD ["npm", "run", "start:${NODE_ENV}"]
CMD npm run start:${NODE_ENV}
