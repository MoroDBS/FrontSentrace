# Deployment Guide

## Overview

This guide covers deploying FrontSentrace to production environments.

## Prerequisites

- Node.js 18+ installed on server
- Backend Traccar API server running
- Domain name (optional)
- SSL certificate (recommended)

## Environment Configuration

### Production Environment Variables

Create `.env.production`:

```env
# Backend API URL
NEXT_PUBLIC_API_URL=https://api.yourdomain.com

# Optional configurations
NEXT_PUBLIC_MAP_DEFAULT_ZOOM=12
NEXT_PUBLIC_MAP_DEFAULT_LAT=0
NEXT_PUBLIC_MAP_DEFAULT_LON=0
```

## Build Process

### 1. Install Dependencies

```bash
npm ci --production=false
```

### 2. Build Application

```bash
npm run build
```

This creates an optimized production build in `.next/` directory.

### 3. Test Production Build

```bash
npm start
```

## Deployment Options

### Option 1: Node.js Server

#### Using PM2 (Recommended)

```bash
# Install PM2 globally
npm install -g pm2

# Start application
pm2 start npm --name "frontsentrace" -- start

# Save PM2 configuration
pm2 save

# Setup PM2 to start on boot
pm2 startup
```

#### PM2 Configuration File

Create `ecosystem.config.js`:

```javascript
module.exports = {
  apps: [{
    name: 'frontsentrace',
    script: 'npm',
    args: 'start',
    env: {
      NODE_ENV: 'production',
      PORT: 3000,
    },
    instances: 'max',
    exec_mode: 'cluster',
    max_memory_restart: '1G',
  }],
};
```

Start with:
```bash
pm2 start ecosystem.config.js
```

### Option 2: Docker

#### Dockerfile

```dockerfile
FROM node:18-alpine AS base

# Install dependencies only when needed
FROM base AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app

COPY package*.json ./
RUN npm ci

# Rebuild the source code only when needed
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

RUN npm run build

# Production image
FROM base AS runner
WORKDIR /app

ENV NODE_ENV production

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000

ENV PORT 3000

CMD ["node", "server.js"]
```

#### docker-compose.yml

```yaml
version: '3.8'

services:
  frontend:
    build: .
    ports:
      - "3000:3000"
    environment:
      - NEXT_PUBLIC_API_URL=http://backend:8082
    depends_on:
      - backend
    restart: unless-stopped

  backend:
    image: traccar/traccar:latest
    ports:
      - "8082:8082"
    volumes:
      - ./traccar-data:/opt/traccar/data
    restart: unless-stopped
```

Build and run:
```bash
docker-compose up -d
```

### Option 3: Vercel

1. Install Vercel CLI:
   ```bash
   npm i -g vercel
   ```

2. Deploy:
   ```bash
   vercel --prod
   ```

3. Configure environment variables in Vercel dashboard

### Option 4: Static Export (Limited Features)

For static hosting without server-side features:

Update `next.config.mjs`:
```javascript
const nextConfig = {
  output: 'export',
  // ... other config
};
```

Build:
```bash
npm run build
```

Deploy `out/` directory to any static host (Netlify, GitHub Pages, S3, etc.)

**Note:** This disables API routes and server-side features.

## Reverse Proxy Configuration

### Nginx

```nginx
server {
    listen 80;
    server_name yourdomain.com;
    
    # Redirect to HTTPS
    return 301 https://$server_name$request_uri;
}

server {
    listen 443 ssl http2;
    server_name yourdomain.com;
    
    ssl_certificate /path/to/cert.pem;
    ssl_certificate_key /path/to/key.pem;
    
    # Frontend
    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
    
    # Backend API
    location /api/ {
        proxy_pass http://localhost:8082/api/;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
    
    # WebSocket
    location /api/socket {
        proxy_pass http://localhost:8082/api/socket;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "Upgrade";
        proxy_set_header Host $host;
    }
}
```

### Apache

```apache
<VirtualHost *:80>
    ServerName yourdomain.com
    Redirect permanent / https://yourdomain.com/
</VirtualHost>

<VirtualHost *:443>
    ServerName yourdomain.com
    
    SSLEngine on
    SSLCertificateFile /path/to/cert.pem
    SSLCertificateKeyFile /path/to/key.pem
    
    ProxyPreserveHost On
    ProxyRequests Off
    
    # Frontend
    ProxyPass / http://localhost:3000/
    ProxyPassReverse / http://localhost:3000/
    
    # WebSocket support
    RewriteEngine on
    RewriteCond %{HTTP:Upgrade} websocket [NC]
    RewriteCond %{HTTP:Connection} upgrade [NC]
    RewriteRule ^/?(.*) "ws://localhost:3000/$1" [P,L]
</VirtualHost>
```

## Performance Optimization

### 1. Enable Compression

Nginx:
```nginx
gzip on;
gzip_vary on;
gzip_types text/plain text/css application/json application/javascript text/xml application/xml application/xml+rss text/javascript;
```

### 2. Cache Static Assets

Nginx:
```nginx
location /_next/static/ {
    alias /path/to/.next/static/;
    expires 1y;
    access_log off;
    add_header Cache-Control "public, immutable";
}
```

### 3. CDN Integration

Configure CDN for static assets:

```javascript
// next.config.mjs
const nextConfig = {
  assetPrefix: process.env.CDN_URL || '',
};
```

## Monitoring

### Health Check Endpoint

Create `app/api/health/route.ts`:

```typescript
export async function GET() {
  return Response.json({ status: 'ok', timestamp: new Date().toISOString() });
}
```

### PM2 Monitoring

```bash
# View logs
pm2 logs frontsentrace

# Monitor resources
pm2 monit

# View status
pm2 status
```

### Application Monitoring

Consider integrating:
- Sentry for error tracking
- Google Analytics for usage analytics
- New Relic or DataDog for performance monitoring

## Backup Strategy

### 1. Application Code
- Use Git for version control
- Tag releases

### 2. Configuration
- Backup `.env` files securely
- Document environment variables

### 3. User Data
- Backend database backups (handled by Traccar)

## Security Checklist

- [ ] HTTPS enabled with valid SSL certificate
- [ ] Environment variables secured
- [ ] CORS configured correctly
- [ ] Rate limiting implemented
- [ ] Security headers configured
- [ ] Dependencies updated regularly
- [ ] Firewall rules configured
- [ ] Access logs enabled
- [ ] Regular security audits

### Security Headers (Nginx)

```nginx
add_header X-Frame-Options "SAMEORIGIN" always;
add_header X-Content-Type-Options "nosniff" always;
add_header X-XSS-Protection "1; mode=block" always;
add_header Referrer-Policy "no-referrer-when-downgrade" always;
add_header Content-Security-Policy "default-src 'self' http: https: data: blob: 'unsafe-inline'" always;
```

## Troubleshooting

### Application Won't Start

1. Check Node.js version: `node --version`
2. Verify dependencies: `npm ci`
3. Check environment variables
4. Review logs: `pm2 logs` or `docker logs`

### High Memory Usage

1. Reduce PM2 instances
2. Increase `max_memory_restart` in PM2 config
3. Check for memory leaks

### Slow Performance

1. Enable compression
2. Configure CDN
3. Optimize images
4. Enable caching
5. Check backend API performance

## Scaling

### Horizontal Scaling

Use PM2 cluster mode:
```javascript
{
  instances: 'max', // or specific number
  exec_mode: 'cluster'
}
```

### Load Balancing

Nginx upstream:
```nginx
upstream frontend {
    server localhost:3000;
    server localhost:3001;
    server localhost:3002;
}

server {
    location / {
        proxy_pass http://frontend;
    }
}
```

## Maintenance

### Updates

1. Backup current version
2. Pull latest code
3. Install dependencies: `npm ci`
4. Build: `npm run build`
5. Restart: `pm2 restart frontsentrace`

### Zero-Downtime Deployment

```bash
# Build new version
npm run build

# Reload PM2 (graceful restart)
pm2 reload frontsentrace
```

## Support

For deployment issues:
- Check documentation: [docs/](../docs/)
- GitHub Issues: [Report issue](../../issues)
- Community forums
