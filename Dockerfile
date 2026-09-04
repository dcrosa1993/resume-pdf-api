# --------------------------
# 1. Build stage
# --------------------------
FROM node:24-bookworm-slim AS builder

WORKDIR /app

# Copiar dependencias
COPY package*.json ./

# Instalar dependencias
RUN npm ci

# Copiar código fuente
COPY . .

# Build NestJS
RUN npm run build


# --------------------------
# 2. Production stage
# --------------------------
FROM node:24-bookworm-slim

WORKDIR /app


ENV NODE_ENV=production

# Dependencias necesarias para Chrome/Puppeteer
RUN apt-get update \
    && apt-get install -y --no-install-recommends \
        ca-certificates \
        fonts-liberation \
        libasound2 \
        libatk-bridge2.0-0 \
        libatk1.0-0 \
        libc6 \
        libcairo2 \
        libcups2 \
        libdbus-1-3 \
        libexpat1 \
        libfontconfig1 \
        libgbm1 \
        libgcc-s1 \
        libglib2.0-0 \
        libgtk-3-0 \
        libnspr4 \
        libnss3 \
        libpango-1.0-0 \
        libpangocairo-1.0-0 \
        libstdc++6 \
        libx11-6 \
        libx11-xcb1 \
        libxcb1 \
        libxcomposite1 \
        libxdamage1 \
        libxext6 \
        libxfixes3 \
        libxrandr2 \
        wget \
    && rm -rf /var/lib/apt/lists/*

# Copiar package files
COPY package*.json ./

# Instalar solamente producción
RUN npm ci --omit=dev

# Copiar build
COPY --from=builder /app/dist ./dist

# Puppeteer cache será compartida entre instalación y runtime
ENV PUPPETEER_CACHE_DIR=/root/.cache/puppeteer

# Descargar Chrome dentro de la imagen
RUN npx puppeteer browsers install chrome

EXPOSE 3000

CMD ["node", "dist/main.js"]