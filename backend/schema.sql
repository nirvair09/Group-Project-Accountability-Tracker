-- Projects table
CREATE TABLE IF NOT EXISTS projects (
    projectId VARCHAR(36) PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    ownerId VARCHAR(36) NOT NULL,
    createdAt TIMESTAMP DEFAULT NOW()
);

-- Project members table
CREATE TABLE IF NOT EXISTS project_members (
    projectId VARCHAR(36) NOT NULL,
    userId VARCHAR(36) NOT NULL,
    role VARCHAR(50) NOT NULL DEFAULT 'MEMBER',
    joinedAt TIMESTAMP DEFAULT NOW(),
    PRIMARY KEY (projectId, userId),
    FOREIGN KEY (projectId) REFERENCES projects(projectId) ON DELETE CASCADE
);

-- Users table (if not exists)
CREATE TABLE IF NOT EXISTS users (
    id VARCHAR(36) PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    role VARCHAR(50) DEFAULT 'STUDENT',
    createdAt TIMESTAMP DEFAULT NOW()
);

-- Tasks table (if not exists)
CREATE TABLE IF NOT EXISTS tasks (
    taskId VARCHAR(36) PRIMARY KEY,
    projectId VARCHAR(36) NOT NULL,
    ownerId VARCHAR(36) NOT NULL,
    title VARCHAR(255) NOT NULL,
    status VARCHAR(50) DEFAULT 'CREATED',
    deadline TIMESTAMP,
    createdAt TIMESTAMP DEFAULT NOW(),
    FOREIGN KEY (projectId) REFERENCES projects(projectId) ON DELETE CASCADE
);

-- Evidence Events table
CREATE TABLE IF NOT EXISTS evidence_events (
    event_id VARCHAR(36) PRIMARY KEY,
    project_id VARCHAR(36) NOT NULL,
    user_id VARCHAR(36) NOT NULL,
    type VARCHAR(50) NOT NULL,
    source VARCHAR(50) NOT NULL,
    timestamp TIMESTAMP DEFAULT NOW(),
    metadata JSONB,
    FOREIGN KEY (project_id) REFERENCES projects(projectId) ON DELETE CASCADE
);
