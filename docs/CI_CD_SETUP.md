# CI/CD Setup Guide

This document explains the Continuous Integration and Continuous Deployment (CI/CD) setup for the MERN project.

## 🚀 Overview

The project uses GitHub Actions for automated testing, linting, and deployment. The CI/CD pipeline ensures code quality and automates the deployment process.

## 📁 Workflow Files

### 1. `ci.yml` - Main CI Pipeline
**Triggers:** Push to main/master/develop branches, Pull Requests

**Jobs:**
- **Backend Testing**: Runs tests, linting, and security audits
- **Frontend Testing**: Runs tests, linting, and build verification
- **Security Scanning**: Checks for vulnerabilities in dependencies
- **Build Verification**: Ensures the application builds successfully

### 2. `deploy.yml` - Production Deployment
**Triggers:** Push to main/master branch (after CI passes)

**Features:**
- Automated deployment to production
- Multiple platform support (Heroku, Vercel, Railway)
- Deployment status notifications

## 🔧 Setup Instructions

### 1. Initialize Git Repository
```bash
git init
git add .
git commit -m "Initial MERN project with CI/CD setup"
```

### 2. Create GitHub Repository
1. Go to GitHub and create a new repository
2. Push your code:
```bash
git remote add origin https://github.com/yourusername/your-repo-name.git
git branch -M main
git push -u origin main
```

### 3. Configure GitHub Secrets (Optional)
For deployment, add these secrets in your GitHub repository settings:

**For Heroku:**
- `HEROKU_API_KEY`
- `HEROKU_APP_NAME`
- `HEROKU_EMAIL`

**For Vercel:**
- `VERCEL_TOKEN`
- `ORG_ID`
- `PROJECT_ID`

**For Railway:**
- `RAILWAY_TOKEN`
- `RAILWAY_SERVICE`

## 🧪 Testing

### Backend Tests
```bash
cd backend
npm test
```

### Frontend Tests
```bash
cd frontend
npm test
```

### Run All Tests
```bash
npm run test
```

## 🔍 Linting

### Backend Linting
```bash
cd backend
npm run lint
npm run lint:fix  # Auto-fix issues
```

### Frontend Linting
```bash
cd frontend
npm run lint
npm run lint:fix  # Auto-fix issues
```

## 📊 Code Coverage

The CI pipeline automatically generates and uploads test coverage reports to Codecov.

**View Coverage:**
- Backend: Check the coverage folder in backend/
- Frontend: Check the coverage folder in frontend/

## 🚀 Deployment Options

### 1. Heroku Deployment
Uncomment the Heroku section in `.github/workflows/deploy.yml`:

```yaml
- name: Deploy to Heroku
  uses: akhileshns/heroku-deploy@v3.12.14
  with:
    heroku_api_key: ${{ secrets.HEROKU_API_KEY }}
    heroku_app_name: ${{ secrets.HEROKU_APP_NAME }}
    heroku_email: ${{ secrets.HEROKU_EMAIL }}
```

### 2. Vercel Deployment
Uncomment the Vercel section in `.github/workflows/deploy.yml`:

```yaml
- name: Deploy to Vercel
  uses: amondnet/vercel-action@v25
  with:
    vercel-token: ${{ secrets.VERCEL_TOKEN }}
    vercel-org-id: ${{ secrets.ORG_ID }}
    vercel-project-id: ${{ secrets.PROJECT_ID }}
    working-directory: ./frontend
```

### 3. Railway Deployment
Uncomment the Railway section in `.github/workflows/deploy.yml`:

```yaml
- name: Deploy to Railway
  uses: bervProject/railway-deploy@v1.0.0
  with:
    railway_token: ${{ secrets.RAILWAY_TOKEN }}
    service: ${{ secrets.RAILWAY_SERVICE }}
```

## 🔄 Workflow Triggers

### CI Pipeline (`ci.yml`)
- **Push**: Any push to main, master, or develop branches
- **Pull Request**: Any PR targeting main or master branches

### Deployment Pipeline (`deploy.yml`)
- **Push**: Only pushes to main or master branches
- **Dependencies**: Requires CI pipeline to pass first

## 📈 Monitoring

### GitHub Actions Dashboard
- Go to your repository on GitHub
- Click on "Actions" tab
- View workflow runs and their status

### Notifications
- PR comments are automatically added when checks pass
- Email notifications for workflow failures (configure in GitHub settings)

## 🛠️ Customization

### Adding New Tests
1. Create test files in `backend/tests/` or `frontend/src/`
2. Follow the existing test patterns
3. Tests will automatically run in CI

### Modifying Linting Rules
1. Edit `.eslintrc.js` files in backend/ and frontend/
2. Update rules as needed
3. Linting will automatically run in CI

### Adding New Jobs
1. Edit the workflow files in `.github/workflows/`
2. Add new steps or jobs as needed
3. Commit and push to trigger the updated workflow

## 🚨 Troubleshooting

### Common Issues

**1. Tests Failing**
- Check test output in GitHub Actions logs
- Ensure MongoDB is running for backend tests
- Verify all dependencies are installed

**2. Linting Errors**
- Run `npm run lint:fix` locally to auto-fix issues
- Check ESLint configuration files
- Update code to match linting rules

**3. Build Failures**
- Check for missing dependencies
- Verify environment variables are set
- Check for syntax errors in code

**4. Deployment Issues**
- Verify GitHub secrets are configured correctly
- Check deployment platform credentials
- Review deployment logs for specific errors

### Getting Help
1. Check GitHub Actions logs for detailed error messages
2. Review the workflow files for configuration issues
3. Ensure all required dependencies are in package.json files

## 📚 Additional Resources

- [GitHub Actions Documentation](https://docs.github.com/en/actions)
- [ESLint Configuration](https://eslint.org/docs/user-guide/configuring)
- [Jest Testing Framework](https://jestjs.io/docs/getting-started)
- [Supertest for API Testing](https://github.com/visionmedia/supertest)

## 🎉 Success Indicators

Your CI/CD pipeline is working correctly when you see:
- ✅ All checks passing on pull requests
- ✅ Successful deployments to production
- ✅ Code coverage reports being generated
- ✅ Automated notifications working
- ✅ No linting errors in the codebase 