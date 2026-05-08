# Stage 1 — deps
FROM node:20-alpine AS deps
WORKDIR /app
COPY package.json .
RUN npm install --production

# Stage 2 — runtime
FROM node:20-alpine
WORKDIR /app
RUN addgroup -S appgroup && adduser -S appuser -G appgroup
COPY --from=deps /app/node_modules ./node_modules
COPY src ./src
USER appuser
EXPOSE 5000
CMD ["node", "src/app.js"]