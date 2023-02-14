FROM node:16.16.0-slim as builder
WORKDIR /app
RUN npm install -g npm@8.11.0
RUN npm install -g @nestjs/cli
COPY package.json .
RUN npm install --force
COPY . .
CMD ["npm", "run", "build"]

FROM node:16.16.0-slim as prod
WORKDIR /app
RUN npm install -g npm@8.11.0
COPY --from=builder /app/package.json .
RUN npm install --force
COPY --from=builder /app/dist/ ./dist
CMD ["node", "dist/main.js"]
