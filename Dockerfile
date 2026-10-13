# ==========================================
# STAGE 1: Build Stage (Node.js Environment)
# ==========================================
FROM node:20-alpine AS build

# Set working directory di dalam kontainer
WORKDIR /app

# Salin package.json dan package-lock.json untuk caching dependency
COPY package*.json ./

# Install seluruh dependency yang diperlukan
RUN npm install

# Salin seluruh source code proyek ke dalam kontainer
COPY . .

# Jalankan build production menggunakan Vite
RUN npm run build

# ==========================================
# STAGE 2: Production Stage (Nginx Web Server)
# ==========================================
FROM nginx:alpine

# Salin konfigurasi Nginx khusus untuk Single Page Application (SPA)
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Salin file hasil build dari Stage 1 (folder dist) ke direktori html Nginx
COPY --from=build /app/dist /usr/share/nginx/html

# Ekspos port 80 untuk lalu lintas HTTP
EXPOSE 80

# Jalankan server web Nginx di foreground
CMD ["nginx", "-g", "daemon off;"]
