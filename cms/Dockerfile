FROM node:16 as base
RUN apt-get update && apt-get install libvips-dev -y
EXPOSE 1337

WORKDIR /cms

COPY ./package*.json /cms/

RUN npm install && npm cache clean --force

COPY . .

ENV PATH ./node_modules/.bin/:$PATH


FROM base as dev
ENV NODE_ENV=development
CMD ["npm", "run", "develop"]

FROM base as prod
ENV NODE_ENV=production
RUN npm run build
CMD ["npm", "run", "start"]
