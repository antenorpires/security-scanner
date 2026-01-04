# syntax = docker/dockerfile:1
ARG NODE_VERSION=22.21.1
FROM node:${NODE_VERSION}-slim AS base
WORKDIR /app
ENV NODE_ENV="production"

FROM base AS build
RUN apt-get update -qq && \
    apt-get install -y --no-install-recommends \
        cmake \
        build-essential \
        node-gyp \
        pkg-config \
        python-is-python3 && \
    rm -rf /var/lib/apt/lists/*

COPY package-lock.json package.json ./
RUN npm ci --only=production
COPY . .

FROM base
RUN apt-get update -qq && \
    apt-get install -y --no-install-recommends \
        curl \
        wget \
        nmap \
        dnsutils \
        whois \
        telnet && \
    rm -rf /var/lib/apt/lists/*
COPY --from=build /app /app
RUN useradd -m scanner && \
    chown -R scanner:scanner /app
USER scanner
EXPOSE 8080
CMD ["npm", "run", "start"]
