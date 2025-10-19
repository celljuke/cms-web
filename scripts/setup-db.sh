#!/bin/bash

set -e

# Load environment variables from .env.local
if [ -f .env.local ]; then
    export $(grep -v '^#' .env.local | grep -v '^$' | xargs)
else
    echo "❌ .env.local not found. Please run ./scripts/init-project.sh first."
    exit 1
fi

# Extract database credentials from DATABASE_URL
# Format: postgresql://user:password@host:port/database
if [ -z "$DATABASE_URL" ]; then
    echo "❌ DATABASE_URL not found in .env.local"
    exit 1
fi

# Parse DATABASE_URL using regex
DB_USER=$(echo "$DATABASE_URL" | sed -n 's|.*://\([^:]*\):.*|\1|p')
DB_PASSWORD=$(echo "$DATABASE_URL" | sed -n 's|.*://[^:]*:\([^@]*\)@.*|\1|p')
DB_HOST=$(echo "$DATABASE_URL" | sed -n 's|.*@\([^:]*\):.*|\1|p')
DB_PORT=$(echo "$DATABASE_URL" | sed -n 's|.*:\([0-9]*\)/.*|\1|p')
DB_NAME=$(echo "$DATABASE_URL" | sed -n 's|.*/\([^?]*\).*|\1|p')

echo "🚀 Setting up database: $DB_NAME..."
echo ""

# Check if Docker is running
if ! docker info > /dev/null 2>&1; then
    echo "❌ Docker is not running. Please start Docker and try again."
    exit 1
fi

# Start PostgreSQL container
echo "📦 Starting PostgreSQL container..."
docker-compose up -d postgres

# Wait for database to be ready
echo "⏳ Waiting for database to be ready..."
sleep 5

# Check if container is running and healthy
for i in {1..12}; do
    if docker-compose exec -T postgres psql -U "$DB_USER" -d "$DB_NAME" -c '\q' >/dev/null 2>&1; then
        echo "✅ Database is ready!"
        break
    fi
    if [ $i -eq 12 ]; then
        echo "❌ Database failed to start within 60 seconds"
        echo "🔍 Check Docker logs: docker-compose logs postgres"
        exit 1
    fi
    echo "   Still waiting... (${i}/12)"
    sleep 5
done

# Generate Prisma client
echo "🔧 Generating Prisma client..."
npm run db:generate

# Push database schema
echo "📊 Pushing database schema..."
npm run db:push

echo ""
echo "🎉 Database setup complete!"
echo ""
echo "📋 Database connection details:"
echo "   Host: $DB_HOST"
echo "   Port: $DB_PORT"
echo "   Database: $DB_NAME"
echo "   Username: $DB_USER"
echo ""
echo "▶️  You can now run: npm run dev" 