# MERN CI/CD Learning Project

A simple MERN (MongoDB, Express.js, React.js, Node.js) stack project designed for learning Continuous Integration and Continuous Deployment (CI/CD) practices.

## Project Structure

```
CI_CD/
├── backend/          # Node.js/Express server
├── frontend/         # React.js client
├── .github/          # GitHub Actions workflows
├── docker/           # Docker configuration
└── docs/            # Documentation
```

## Features

- **Backend**: Express.js API with MongoDB integration
- **Frontend**: React.js with modern UI components
- **Database**: MongoDB with Mongoose ODM
- **Testing**: Jest for both frontend and backend
- **CI/CD**: GitHub Actions workflows
- **Docker**: Containerization support

## Quick Start

1. **Install dependencies:**
   ```bash
   npm run install-all
   ```

2. **Set up environment variables:**
   - Copy `.env.example` to `.env` in both backend and frontend directories
   - Update the values as needed

3. **Start development servers:**
   ```bash
   npm run dev
   ```

4. **Access the application:**
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:5000

## CI/CD Learning Path

### Phase 1: Basic Setup ✅
- [x] Project structure creation
- [x] Basic MERN stack implementation
- [x] Environment configuration

### Phase 2: Testing Implementation
- [ ] Unit tests for backend API
- [ ] Component tests for React frontend
- [ ] Integration tests
- [ ] Test coverage reporting

### Phase 3: GitHub Actions CI
- [ ] Linting and code quality checks
- [ ] Automated testing on pull requests
- [ ] Build verification
- [ ] Security scanning

### Phase 4: Deployment Pipeline
- [ ] Docker containerization
- [ ] Environment-specific deployments
- [ ] Database migrations
- [ ] Blue-green deployment strategy

### Phase 5: Advanced CI/CD
- [ ] Feature branch deployments
- [ ] Automated rollbacks
- [ ] Performance monitoring
- [ ] Slack/Discord notifications

## Available Scripts

- `npm run install-all` - Install all dependencies
- `npm run dev` - Start development servers
- `npm run start` - Start production servers
- `npm run build` - Build frontend for production
- `npm run test` - Run all tests

## Next Steps

1. Set up MongoDB database (local or cloud)
2. Implement the basic CRUD operations
3. Add authentication system
4. Create comprehensive test suite
5. Set up GitHub Actions workflows
6. Configure Docker containers
7. Deploy to cloud platforms

## Contributing

This project is designed for learning purposes. Feel free to experiment with different CI/CD configurations and deployment strategies. 