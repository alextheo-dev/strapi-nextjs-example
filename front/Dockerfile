FROM node:18-alpine as dev

WORKDIR /front

COPY ./package*.json /front/

RUN npm install && npm cache clean --force

COPY . .

EXPOSE 3000

ENV PATH ./node_modules/.bin/:$PATH

ENV NODE_ENV=development

CMD ["npm", "run", "dev"]

FROM node:18-alpine as builder

WORKDIR /front

COPY ./package*.json /front/

RUN npm install && npm cache clean --force

COPY . .

RUN npm run build

FROM node:18-alpine as prod

WORKDIR /front

COPY --from=builder --chown=nextjs:nodejs /front/.next ./.next
COPY --from=builder /front/node_modules ./node_modules
COPY --from=builder /front/package.json ./package.json
COPY --from=builder /front/public ./public

ENV NODE_ENV=production

EXPOSE 3000

CMD ["npm", "run", "start"]
