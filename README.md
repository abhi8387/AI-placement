# AI Placement Prep Platform

AI Placement Prep Platform is a backend-focused AI-powered application designed to help students prepare for placements using resume analysis and AI-generated insights.

Current features implemented:
- User Authentication (JWT)
- Cloud PostgreSQL Database
- Resume PDF Upload
- PDF Text Extraction
- Resume Storage
- AI-based Resume Analysis
- ATS Score Generation
- Skill Gap Analysis

---

# Tech Stack

## Backend
- Node.js
- Express.js

## Database
- PostgreSQL (Neon Cloud)

## ORM
- Prisma ORM

## Authentication
- JWT (JSON Web Token)
- bcrypt

## File Upload
- Multer

## PDF Parsing
- pdf-parse

## AI Integration
- OpenRouter API
- GPT-4o-mini

---

# Features Implemented

## 1. Authentication System

### Signup API
Users can create accounts securely.

### Login API
Users can login and receive JWT tokens.

### Password Security
Passwords are hashed using bcrypt before storage.

### Protected Routes
JWT middleware protects private endpoints.

---

## 2. Resume Upload System

Users can upload resumes in PDF format.

Uploaded resumes are:
- stored locally in uploads/
- parsed using pdf-parse
- converted into text
- saved in PostgreSQL database

---

## 3. Resume Analysis using AI

Users can analyze resumes against Job Descriptions.

The AI system generates:
- ATS score
- missing skills
- strengths
- improvement suggestions

---

# Project Structure

```text
src/
 ├── controllers/
 ├── routes/
 ├── middleware/
 ├── services/
 ├── lib/
 └── server.js

uploads/
prisma/
```

---

# Database Models

## User Model

```prisma
model User {
  id        Int      @id @default(autoincrement())
  name      String
  email     String   @unique
  password  String
  createdAt DateTime @default(now())

  resumes Resume[]
}
```

---

## Resume Model

```prisma
model Resume {
  id         Int      @id @default(autoincrement())
  content    String
  fileName   String
  createdAt  DateTime @default(now())

  userId Int
  user   User @relation(fields: [userId], references: [id])
}
```

---

# API Endpoints

# Authentication APIs

## Signup

```http
POST /api/auth/signup
```

### Request Body

```json
{
  "name": "Abhijit",
  "email": "abhi@test.com",
  "password": "123456"
}
```

---

## Login

```http
POST /api/auth/login
```

### Request Body

```json
{
  "email": "abhi@test.com",
  "password": "123456"
}
```

---

# Resume APIs

## Upload Resume

```http
POST /api/resume/upload
```

### Headers

```text
Authorization: Bearer TOKEN
```

### Body
Use form-data:

```text
Key: resume
Type: File
```

---

# AI Analysis APIs

## Analyze Resume

```http
POST /api/analyze/resume
```

### Headers

```text
Authorization: Bearer TOKEN
```

### Request Body

```json
{
  "jobDescription": "Backend developer with Node.js, Express, SQL, JWT, REST API knowledge"
}
```

---

# Installation

## Clone Repository

```bash
git clone <repository_url>
```

---

## Install Dependencies

```bash
npm install
```

---

# Required Packages

```bash
npm install express cors dotenv bcrypt jsonwebtoken multer pdf-parse prisma @prisma/client openai
```

---

# Environment Variables

Create a `.env` file:

```env
DATABASE_URL=your_neon_database_url
JWT_SECRET=your_secret_key
OPENROUTER_API_KEY=your_openrouter_api_key
PORT=5000
```

---

# Prisma Setup

## Initialize Prisma

```bash
npx prisma init
```

---

## Run Migration

```bash
npx prisma migrate dev --name init
```

---

## Generate Prisma Client

```bash
npx prisma generate
```

---

# Run Project

```bash
npm run dev
```

---

# Resume Analysis Flow

```text
User Login
 ↓
JWT Authentication
 ↓
Upload Resume PDF
 ↓
PDF Parsing
 ↓
Resume Text Storage
 ↓
Job Description Input
 ↓
Prompt Generation
 ↓
LLM API Call
 ↓
AI Analysis Response
```

---

# Example AI Response

```json
{
  "ats_score": 95,
  "missing_skills": [],
  "strengths": [
    "Experience with Node.js and Express.js"
  ],
  "improvements": [
    "Add deployment experience"
  ]
}
```

---

# Future Enhancements

- Mock Interview Engine
- DSA Question Generator
- Coding Feedback System
- Personalized AI Roadmaps
- Company-Specific Preparation
- Progress Analytics
- RAG Integration
- Vector Database Integration
- AI Memory System

---

# Learning Outcomes

This project demonstrates:
- Backend Development
- REST API Design
- Authentication
- Database Design
- Cloud Database Integration
- File Upload Handling
- PDF Parsing
- AI/LLM Integration
- Prompt Engineering
- Structured AI Responses

---

# Author

Abhijit Zala
B.Tech Computer Science
PDEU

