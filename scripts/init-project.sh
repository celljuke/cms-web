#!/bin/bash

# Project Initialization Script
# This script helps set up a new project from the template

set -e

echo "🚀 Welcome to the Next.js Full-Stack Template Setup!"
echo ""

# Check if we're in a git repository
if [ ! -d .git ]; then
    echo "⚠️  Warning: Not in a git repository. Initialize git first:"
    echo "   git init"
    echo "   git add ."
    echo "   git commit -m 'Initial commit from template'"
    echo ""
fi

# Get project name
read -p "📦 Enter your project name (e.g., my-awesome-app): " PROJECT_NAME

if [ -z "$PROJECT_NAME" ]; then
    echo "❌ Project name cannot be empty"
    exit 1
fi

# Convert to lowercase and replace spaces with hyphens
PROJECT_NAME=$(echo "$PROJECT_NAME" | tr '[:upper:]' '[:lower:]' | tr ' ' '-')
echo "✅ Using project name: $PROJECT_NAME"
echo ""

# Update package.json
echo "📝 Updating package.json..."
npm pkg set name="$PROJECT_NAME"
npm pkg set version="0.1.0"

# Generate database credentials
DB_USER="${PROJECT_NAME}_user"
DB_PASSWORD=$(openssl rand -base64 16 | tr -d "=+/" | cut -c1-20)
DB_NAME="${PROJECT_NAME}_db"
DB_CONTAINER="${PROJECT_NAME}_db"
DB_PORT="5434"

echo "🔐 Generated database credentials:"
echo "   User: $DB_USER"
echo "   Password: $DB_PASSWORD"
echo "   Database: $DB_NAME"
echo ""

# Update docker-compose.yml
echo "🐳 Updating docker-compose.yml..."
sed -i.bak "s/container_name: cms_web_db-db/container_name: ${DB_CONTAINER}/" docker-compose.yml
sed -i.bak "s/POSTGRES_USER: cms_web_db_user/POSTGRES_USER: ${DB_USER}/" docker-compose.yml
sed -i.bak "s/POSTGRES_PASSWORD: cms_web_db_password/POSTGRES_PASSWORD: ${DB_PASSWORD}/" docker-compose.yml
sed -i.bak "s/POSTGRES_DB: cms_web_db/POSTGRES_DB: ${DB_NAME}/" docker-compose.yml
rm docker-compose.yml.bak 2>/dev/null || true

# Generate auth secret
AUTH_SECRET=$(openssl rand -base64 32)

# Create .env.local
echo "📄 Creating .env.local..."
cat > .env.local << EOF
# Database Configuration
DATABASE_URL="postgresql://${DB_USER}:${DB_PASSWORD}@localhost:${DB_PORT}/${DB_NAME}?schema=public"
DATABASE_URL_UNPOOLED="postgresql://${DB_USER}:${DB_PASSWORD}@localhost:${DB_PORT}/${DB_NAME}?schema=public"

# Better Auth Configuration
BETTER_AUTH_SECRET="${AUTH_SECRET}"
BETTER_AUTH_URL="http://localhost:3000"

# Node Environment
NODE_ENV="development"
EOF

echo "✅ Configuration files updated!"
echo ""

# Ask if user wants to set up database now
read -p "🗄️  Do you want to set up the database now? (y/n): " SETUP_DB

if [ "$SETUP_DB" = "y" ] || [ "$SETUP_DB" = "Y" ]; then
    echo ""
    echo "🚀 Setting up database..."
    
    # Check if Docker is running
    if ! docker info > /dev/null 2>&1; then
        echo "❌ Docker is not running. Please start Docker and run: npm run db:setup"
        exit 1
    fi
    
    # Run database setup
    npm run db:setup
    
    echo ""
    echo "✅ Database setup complete!"
else
    echo ""
    echo "⏭️  Skipping database setup. Run 'npm run db:setup' when ready."
fi

echo ""
echo "🎉 Project initialization complete!"
echo ""
echo "📋 Next steps:"
echo "   1. Review .env.local and update if needed"
echo "   2. Run 'npm install' if you haven't already"
if [ "$SETUP_DB" != "y" ] && [ "$SETUP_DB" != "Y" ]; then
    echo "   3. Run 'npm run db:setup' to set up the database"
    echo "   4. Run 'npm run dev' to start development"
else
    echo "   3. Run 'npm run dev' to start development"
fi
echo ""
echo "📚 Documentation:"
echo "   - README.md - Full documentation"
echo "   - TEMPLATE_SETUP.md - Detailed setup guide"
echo ""
echo "Happy coding! 🚀"

