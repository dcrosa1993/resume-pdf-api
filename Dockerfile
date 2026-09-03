# --------------------------
# 1. Build stage
# --------------------------
FROM node:24-alpine AS builder

WORKDIR /app

# Instalar dependencias
COPY package*.json ./
RUN npm install

# Copiar código
COPY . .

# Build NestJS
RUN npm run build


# --------------------------
# 2. Production stage
# --------------------------
FROM node:24-alpine

ARG TELEGRAM_BOT_TOKEN
ENV TELEGRAM_BOT_TOKEN=${TELEGRAM_BOT_TOKEN}

WORKDIR /app

# Solo prod deps
COPY package*.json ./
RUN npm install --omit=dev

# Copiar build desde stage anterior
COPY --from=builder /app/dist ./dist

# Variables de entorno (opcional)
ENV NODE_ENV=development

# Puerto por defecto NestJS
EXPOSE 3000

# Ejecutar app
CMD ["node", "dist/main.js"]