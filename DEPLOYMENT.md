# 🚀 Deployment Guide

This guide covers deploying your Next.js application to various platforms.

## 📋 Pre-Deployment Checklist

- [ ] All features tested locally
- [ ] Production build works: `npm run build`
- [ ] Environment variables documented
- [ ] Database migrations ready
- [ ] Authentication configured for production
- [ ] Error tracking set up (optional)
- [ ] Analytics configured (optional)

## 🌐 Vercel (Recommended)

Vercel is the easiest way to deploy Next.js applications.

### Setup Steps

1. **Push to GitHub**

   ```bash
   git add .
   git commit -m "Ready for deployment"
   git push origin main
   ```

2. **Import to Vercel**

   - Go to [vercel.com](https://vercel.com)
   - Click "Import Project"
   - Select your repository
   - Click "Import"

3. **Configure Environment Variables**

   Add these in Vercel Dashboard → Settings → Environment Variables:

   ```env
   DATABASE_URL=postgresql://user:password@host:5432/dbname
   DATABASE_URL_UNPOOLED=postgresql://user:password@host:5432/dbname
   BETTER_AUTH_SECRET=<generate-new-secret>
   BETTER_AUTH_URL=https://your-domain.vercel.app
   NODE_ENV=production
   ```

4. **Set Up Database**

   **Option A: Vercel Postgres**

   ```bash
   # In your Vercel project
   vercel postgres create
   ```

   **Option B: External Provider** (see Database Providers section)

5. **Deploy**
   ```bash
   vercel --prod
   ```

### Automatic Deployments

Vercel automatically deploys:

- **Production**: Pushes to `main` branch
- **Preview**: Pull requests and other branches

## 🗄️ Database Providers

### Supabase (Recommended)

1. **Create Project**

   - Go to [supabase.com](https://supabase.com)
   - Create new project
   - Wait for database to initialize

2. **Get Connection String**

   - Go to Settings → Database
   - Copy "Connection string" (Transaction mode)
   - Copy "Connection string" (Session mode for unpooled)

3. **Update Environment Variables**

   ```env
   DATABASE_URL=<transaction-mode-url>
   DATABASE_URL_UNPOOLED=<session-mode-url>
   ```

4. **Run Migrations**
   ```bash
   npx prisma migrate deploy
   ```

### Neon

1. **Create Project**

   - Go to [neon.tech](https://neon.tech)
   - Create new project

2. **Get Connection String**

   - Copy connection string from dashboard

3. **Configure**
   ```env
   DATABASE_URL=<neon-connection-string>
   DATABASE_URL_UNPOOLED=<neon-connection-string>
   ```

### Railway

1. **Create Database**

   - Go to [railway.app](https://railway.app)
   - New Project → PostgreSQL

2. **Get Connection String**

   - Click database → Connect
   - Copy PostgreSQL connection URL

3. **Deploy**
   ```env
   DATABASE_URL=<railway-connection-string>
   DATABASE_URL_UNPOOLED=<railway-connection-string>
   ```

### PlanetScale (MySQL)

If you prefer MySQL:

1. **Update Prisma Schema**

   ```prisma
   datasource db {
     provider = "mysql"
     url      = env("DATABASE_URL")
     relationMode = "prisma"
   }
   ```

2. **Create Database**

   - Go to [planetscale.com](https://planetscale.com)
   - Create database

3. **Get Connection String**

   - Copy connection string

4. **Deploy**
   ```bash
   npx prisma db push
   ```

## 🐳 Docker Deployment

### Build Docker Image

Create `Dockerfile`:

```dockerfile
FROM node:20-alpine AS base

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

# Generate Prisma Client
RUN npx prisma generate

# Build Next.js
ENV NEXT_TELEMETRY_DISABLED 1
RUN npm run build

# Production image
FROM base AS runner
WORKDIR /app

ENV NODE_ENV production
ENV NEXT_TELEMETRY_DISABLED 1

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static
COPY --from=builder /app/node_modules/.prisma ./node_modules/.prisma

USER nextjs

EXPOSE 3000

ENV PORT 3000
ENV HOSTNAME "0.0.0.0"

CMD ["node", "server.js"]
```

Update `next.config.ts`:

```typescript
const nextConfig: NextConfig = {
  output: "standalone",
};
```

### Build and Run

```bash
docker build -t my-app .
docker run -p 3000:3000 --env-file .env.production my-app
```

## ☁️ Cloud Platforms

### AWS (Elastic Beanstalk)

1. **Install EB CLI**

   ```bash
   pip install awsebcli
   ```

2. **Initialize**

   ```bash
   eb init
   ```

3. **Create Environment**

   ```bash
   eb create production
   ```

4. **Set Environment Variables**

   ```bash
   eb setenv DATABASE_URL=xxx BETTER_AUTH_SECRET=xxx
   ```

5. **Deploy**
   ```bash
   eb deploy
   ```

### Google Cloud Platform (Cloud Run)

1. **Build Container**

   ```bash
   gcloud builds submit --tag gcr.io/PROJECT_ID/my-app
   ```

2. **Deploy**

   ```bash
   gcloud run deploy my-app \
     --image gcr.io/PROJECT_ID/my-app \
     --platform managed \
     --region us-central1 \
     --allow-unauthenticated
   ```

3. **Set Environment Variables**
   ```bash
   gcloud run services update my-app \
     --update-env-vars DATABASE_URL=xxx,BETTER_AUTH_SECRET=xxx
   ```

### Azure (App Service)

1. **Create App Service**

   ```bash
   az webapp create --name my-app --resource-group myResourceGroup
   ```

2. **Configure**

   ```bash
   az webapp config appsettings set \
     --name my-app \
     --resource-group myResourceGroup \
     --settings DATABASE_URL=xxx BETTER_AUTH_SECRET=xxx
   ```

3. **Deploy**
   ```bash
   az webapp deployment source config-zip \
     --name my-app \
     --resource-group myResourceGroup \
     --src app.zip
   ```

## 🔐 Security Checklist

- [ ] Strong `BETTER_AUTH_SECRET` generated
- [ ] Database credentials secured
- [ ] HTTPS enabled
- [ ] CORS configured properly
- [ ] Rate limiting implemented
- [ ] Input validation in place
- [ ] SQL injection prevention (Prisma handles this)
- [ ] XSS protection enabled
- [ ] Environment variables not committed

## 📊 Monitoring & Logging

### Vercel Analytics

```bash
npm install @vercel/analytics
```

```typescript
// app/layout.tsx
import { Analytics } from "@vercel/analytics/react";

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
```

### Sentry (Error Tracking)

```bash
npm install @sentry/nextjs
```

```bash
npx @sentry/wizard@latest -i nextjs
```

### Logging

Consider:

- [Axiom](https://axiom.co)
- [Logtail](https://logtail.com)
- [Datadog](https://www.datadoghq.com)

## 🔄 CI/CD

### GitHub Actions

See `.github/workflows/ci.yml.example` for a starter workflow.

Rename to `.github/workflows/ci.yml` and customize:

```yaml
name: Deploy to Production

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: "20"
      - run: npm ci
      - run: npm run build
      - name: Deploy to Vercel
        run: vercel --prod --token=${{ secrets.VERCEL_TOKEN }}
```

## 🌍 Custom Domain

### Vercel

1. Go to Project Settings → Domains
2. Add your domain
3. Configure DNS:
   ```
   Type: CNAME
   Name: @
   Value: cname.vercel-dns.com
   ```

### SSL Certificate

Vercel automatically provides SSL certificates. For other platforms:

- Use Let's Encrypt
- Configure in platform settings
- Ensure HTTPS redirect is enabled

## 📈 Performance Optimization

- [ ] Enable caching headers
- [ ] Optimize images (Next.js Image component)
- [ ] Enable compression
- [ ] Use CDN for static assets
- [ ] Implement ISR (Incremental Static Regeneration)
- [ ] Database connection pooling
- [ ] Redis for caching (optional)

## 🔧 Environment-Specific Configs

### Production

```env
NODE_ENV=production
DATABASE_URL=<production-db>
BETTER_AUTH_URL=https://yourdomain.com
```

### Staging

```env
NODE_ENV=staging
DATABASE_URL=<staging-db>
BETTER_AUTH_URL=https://staging.yourdomain.com
```

## 🆘 Troubleshooting

### Build Fails

```bash
# Clear cache
rm -rf .next node_modules
npm install
npm run build
```

### Database Connection Issues

- Check connection string format
- Verify database is accessible from deployment platform
- Check IP whitelist settings
- Ensure SSL mode is correct

### Environment Variables Not Working

- Restart deployment after adding variables
- Check variable names (no typos)
- Ensure variables are set for production environment
- Rebuild application

## 📚 Additional Resources

- [Next.js Deployment Docs](https://nextjs.org/docs/deployment)
- [Vercel Documentation](https://vercel.com/docs)
- [Prisma Deployment Guide](https://www.prisma.io/docs/guides/deployment)
- [Better Auth Production Guide](https://www.better-auth.com/docs/deployment)

## 🎉 Post-Deployment

1. Test all functionality
2. Monitor error rates
3. Check performance metrics
4. Set up uptime monitoring
5. Configure backups
6. Document deployment process
7. Share with team!

Good luck with your deployment! 🚀
