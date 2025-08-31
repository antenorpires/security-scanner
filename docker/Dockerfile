FROM node:20-slim
WORKDIR /app
RUN apt-get update && apt-get install -y --no-install-recommends \
    curl \
    proxychains4 \
    nmap \
    dnsutils \
    tor \
 && rm -rf /var/lib/apt/lists/*
COPY package*.json ./
RUN npm install --only=production
COPY logs /app/logs
COPY node_modules /app/node_modules
COPY public /app/public
COPY src /app/src
COPY LICENSE /app/LICENSE
COPY package.json /app/package.json
COPY package-lock.json /app/package-lock.json
EXPOSE 8080
CMD service tor start && npm run start
