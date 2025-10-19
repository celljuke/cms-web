# ✅ Template Publishing Checklist

Use this checklist before publishing your template or creating new projects from it.

## 📋 Pre-Publishing Checklist

### 1. Code Quality

- [ ] All code is working and tested
- [ ] No hardcoded credentials or secrets
- [ ] No personal information in code
- [ ] No TODO comments left in production code
- [ ] TypeScript has no errors: `npx tsc --noEmit`
- [ ] Build succeeds: `npm run build`
- [ ] Development server runs: `npm run dev`

### 2. Configuration Files

- [ ] `package.json` has correct name
- [ ] `package.json` has your author name
- [ ] `package.json` has correct repository URL
- [ ] `LICENSE` has your name and correct year
- [ ] `.env.example` is complete and accurate
- [ ] `docker-compose.yml` has generic credentials
- [ ] `components.json` is configured correctly

### 3. Documentation

- [ ] `README.md` is comprehensive
- [ ] `QUICKSTART.md` is clear and concise
- [ ] `TEMPLATE_SETUP.md` has detailed instructions
- [ ] `DEPLOYMENT.md` covers major platforms
- [ ] `ARCHITECTURE.md` explains the design
- [ ] `HOW_TO_USE_AS_TEMPLATE.md` is complete
- [ ] `CONTRIBUTING.md` has contribution guidelines
- [ ] `CHANGELOG.md` is up to date
- [ ] All documentation links work
- [ ] No broken internal references

### 4. Scripts

- [ ] `scripts/setup-db.sh` is executable
- [ ] `scripts/init-project.sh` is executable
- [ ] All npm scripts work correctly
- [ ] Database setup script runs successfully
- [ ] Init script properly configures new projects

### 5. GitHub Setup

- [ ] Repository is on GitHub
- [ ] Repository has a good description
- [ ] Repository has relevant topics/tags
- [ ] "Template repository" is enabled in Settings
- [ ] Issue templates are in place
- [ ] PR template is in place
- [ ] `.github/workflows/ci.yml.example` is ready
- [ ] Repository is public (or accessible to team)

### 6. Security

- [ ] No `.env` or `.env.local` files committed
- [ ] No API keys or secrets in code
- [ ] `.gitignore` is comprehensive
- [ ] Database credentials are generic/example only
- [ ] Auth secrets are placeholders

### 7. Dependencies

- [ ] All dependencies are installed
- [ ] No unused dependencies
- [ ] Versions are up to date
- [ ] No security vulnerabilities: `npm audit`
- [ ] `package-lock.json` is committed

### 8. Testing

- [ ] Fresh install works: `rm -rf node_modules && npm install`
- [ ] Database setup works: `npm run db:setup`
- [ ] Development server starts: `npm run dev`
- [ ] Production build works: `npm run build`
- [ ] All pages load without errors
- [ ] Authentication flow works (if implemented)

## 🚀 Publishing Steps

### Step 1: Final Review

```bash
# Clean install
rm -rf node_modules package-lock.json
npm install

# Test build
npm run build

# Test dev server
npm run dev
```

### Step 2: Git Preparation

```bash
# Ensure all changes are committed
git status

# Commit any remaining changes
git add .
git commit -m "Prepare template for publishing"
```

### Step 3: Push to GitHub

```bash
# Push to main branch
git push origin main

# Create a release tag (optional)
git tag -a v1.0.0 -m "Initial template release"
git push origin v1.0.0
```

### Step 4: Enable Template

1. Go to GitHub repository
2. Click **Settings**
3. Scroll to **Template repository**
4. Check ☑️ **Template repository**
5. Click **Save**

### Step 5: Enhance Repository

1. **Add Topics**: nextjs, react, typescript, template, prisma, trpc
2. **Add Description**: "Production-ready Next.js template with auth and database"
3. **Add Website**: Link to demo (if available)
4. **Add Social Image**: Create a preview image (optional)

### Step 6: Test Template

1. Click "Use this template"
2. Create a test repository
3. Clone it
4. Run `./scripts/init-project.sh`
5. Verify everything works
6. Delete test repository if successful

## 📦 Creating New Project Checklist

When creating a new project from your template:

### Step 1: Create from Template

- [ ] Click "Use this template" on GitHub
- [ ] Name your new repository
- [ ] Choose public/private
- [ ] Clone the new repository

### Step 2: Initialize Project

```bash
cd your-new-project

# Run initialization script
chmod +x scripts/init-project.sh
./scripts/init-project.sh

# Or manually:
npm pkg set name="your-project-name"
cp .env.example .env.local
# Edit .env.local with your values
```

### Step 3: Customize

- [ ] Update `package.json` description
- [ ] Update `README.md` with project-specific info
- [ ] Update `LICENSE` if needed
- [ ] Remove `TEMPLATE_*.md` files (optional)
- [ ] Remove `HOW_TO_USE_AS_TEMPLATE.md` (optional)

### Step 4: Setup

```bash
# Install dependencies
npm install

# Setup database
npm run db:setup

# Start development
npm run dev
```

### Step 5: Verify

- [ ] App runs on http://localhost:3000
- [ ] Database is accessible
- [ ] No console errors
- [ ] Hot reload works
- [ ] TypeScript has no errors

### Step 6: First Commit

```bash
git add .
git commit -m "Initialize project from template"
git push origin main
```

## 🔄 Template Maintenance Checklist

Perform these tasks regularly to keep your template up to date:

### Monthly

- [ ] Update dependencies: `npm update`
- [ ] Check for security issues: `npm audit`
- [ ] Test that everything still works
- [ ] Update `CHANGELOG.md`
- [ ] Commit and push updates

### Quarterly

- [ ] Review and update documentation
- [ ] Check for major version updates
- [ ] Test with fresh project creation
- [ ] Update examples if needed
- [ ] Review and close stale issues

### Annually

- [ ] Major dependency updates
- [ ] Review and update architecture
- [ ] Refactor if needed
- [ ] Update copyright year in LICENSE
- [ ] Create new release tag

## 🐛 Troubleshooting Checklist

If something doesn't work:

### Build Issues

- [ ] Clear `.next` folder: `rm -rf .next`
- [ ] Reinstall dependencies: `rm -rf node_modules && npm install`
- [ ] Check TypeScript errors: `npx tsc --noEmit`
- [ ] Check for missing environment variables

### Database Issues

- [ ] Check Docker is running: `docker ps`
- [ ] Restart database: `npm run db:restart`
- [ ] Check connection string in `.env.local`
- [ ] Regenerate Prisma client: `npm run db:generate`
- [ ] View logs: `npm run db:logs`

### Template Issues

- [ ] Verify "Template repository" is enabled
- [ ] Check repository is public (or accessible)
- [ ] Refresh GitHub page
- [ ] Try in incognito/private browser window

### Script Issues

- [ ] Verify scripts are executable: `chmod +x scripts/*.sh`
- [ ] Check for Windows line endings (use LF, not CRLF)
- [ ] Run with bash explicitly: `bash scripts/setup-db.sh`

## 📊 Quality Metrics

Your template is ready when:

- ✅ Documentation is comprehensive (8+ guides)
- ✅ Setup takes < 5 minutes
- ✅ Zero configuration needed for basic use
- ✅ All scripts work on first try
- ✅ No errors in console
- ✅ TypeScript compiles without errors
- ✅ Build succeeds
- ✅ Tests pass (if you have tests)
- ✅ Fresh project creation works
- ✅ Team members can use it easily

## 🎯 Success Criteria

- [ ] You can create a new project in < 5 minutes
- [ ] New team members can get started without help
- [ ] No "it works on my machine" issues
- [ ] Documentation answers common questions
- [ ] Scripts handle errors gracefully
- [ ] Template saves significant time
- [ ] Code quality is consistent across projects

## 📈 Next Level (Optional)

To make your template even better:

- [ ] Add comprehensive test suite
- [ ] Set up automated CI/CD
- [ ] Create video tutorial
- [ ] Write blog post about it
- [ ] Create demo application
- [ ] Add Storybook for components
- [ ] Set up automated dependency updates (Dependabot)
- [ ] Create multiple variants (minimal, full, etc.)
- [ ] Add internationalization (i18n)
- [ ] Add monitoring/analytics setup

## 🎉 Final Check

Before considering your template "done":

- [ ] You've used it to create at least one real project
- [ ] Someone else has successfully used it
- [ ] Documentation is clear and complete
- [ ] All scripts work reliably
- [ ] No known bugs or issues
- [ ] You're proud to share it

---

## 📞 Quick Commands Reference

```bash
# Test everything
npm install && npm run db:setup && npm run build && npm run dev

# Clean slate
rm -rf node_modules .next package-lock.json && npm install

# Check for issues
npx tsc --noEmit && npm audit && npm run build

# Update dependencies
npm update && npm audit fix

# Create release
git tag -a v1.0.0 -m "Release version 1.0.0" && git push --tags
```

---

**Remember**: A good template is never "done" - it evolves with your needs and the ecosystem. Keep iterating and improving!

Good luck! 🚀
