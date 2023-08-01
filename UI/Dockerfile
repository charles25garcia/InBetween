FROM node:lts-alpine

WORKDIR /app

RUN apk update && apk upgrade
RUN apk add git

COPY ./package*.json /app/

# RUN npm install && npm cache clean --force
RUN npm install

COPY . .

# ENV PATH ./node_modules/.bin/:$PATH

# Use argument for different build stages
ARG INBETWEEN_ENV=production

# Use environment variable
ENV INBETWEEN_ENV=${INBETWEEN_ENV}

RUN npm run build
# RUN npx nuxi build

EXPOSE 3000

ENV NUXT_HOST=0.0.0.0
ENV NUXT_PORT=3000

# CMD [ "npx", "nuxi", "start" ]

# Run the application
CMD npm run start:${INBETWEEN_ENV}