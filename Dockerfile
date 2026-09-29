# --------------------------
# 1. Build stage
# --------------------------
FROM node:24-bookworm-slim AS builder

WORKDIR /app

# Prevent Puppeteer from downloading Chrome during npm install.
ENV PUPPETEER_SKIP_DOWNLOAD=true

# Copy dependency files
COPY package*.json ./

# Install dependencies
RUN npm ci

# Copy source code
COPY . .

# Build NestJS
RUN npm run build


# --------------------------
# 2. Production stage
# --------------------------
FROM node:24-bookworm-slim

WORKDIR /app

ENV NODE_ENV=production

# Prevent Puppeteer from downloading Chrome during npm install.
ENV PUPPETEER_SKIP_DOWNLOAD=true

# Puppeteer browser cache
ENV PUPPETEER_CACHE_DIR=/root/.cache/puppeteer

# Chrome runtime dependencies
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
        unzip \
    && rm -rf /var/lib/apt/lists/*

# Copy dependency files
COPY package*.json ./

# Install production dependencies without downloading Chrome
RUN npm ci --omit=dev

# Copy compiled application
COPY --from=builder /app/dist ./dist

# Remove any incomplete Puppeteer installation
RUN npx puppeteer browsers clear

# Install the Chrome version pinned by the current Puppeteer version
RUN PUPPETEER_SKIP_DOWNLOAD=false \
    npx puppeteer browsers install chrome

EXPOSE 3000

CMD ["node", "dist/main.js"]