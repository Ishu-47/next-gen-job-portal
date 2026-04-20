# 🚀 Smart Job Portal

A full-stack Job Matching Platform that connects job seekers with employers through intelligent filtering and streamlined application management.

The platform allows Job Seekers to discover jobs based on their skills and location, while Employers can manage companies, post jobs, and track applicants through a dedicated dashboard.

---

# ✨ Features

## 🔐 Authentication & Security
- JWT Based Authentication for secure stateless sessions
- Role Based Access Control (RBAC)
  - JOB_SEEKER
  - EMPLOYER
- BCrypt Password Encryption
- Secure REST APIs with Spring Security

---

# 👤 Job Seeker Features

- Create and manage profile
- Add skills dynamically
- Browse jobs with pagination
- Search jobs by:
  - Location
  - Skills
- Apply for jobs
- Track application status

---

# 🏢 Employer Features

- Create and manage company profile
- Post job listings
- Edit or archive jobs
- View all applicants
- Manage candidates via Applicant Tracking System (ATS)

---

# 🛠 Tech Stack

| Layer | Technology |
|------|------------|
| Frontend | React, Vite, Tailwind CSS |
| API Communication | Axios |
| Routing | React Router |
| Backend | Java, Spring Boot |
| Security | Spring Security, JWT |
| ORM | Spring Data JPA, Hibernate |
| Database | PostgreSQL |
| Build Tools | Maven, NPM |

---

# 🏗 Project Architecture

The backend follows a Layered Monolith Architecture.

```
backend/

├── controller/
│   ├── AuthController.java
│   ├── JobController.java
│   ├── ApplicationController.java
│
├── service/
│   ├── AuthService.java
│   ├── JobService.java
│   ├── ApplicationService.java
│
├── repository/
│   ├── UserRepository.java
│   ├── JobRepository.java
│   ├── ApplicationRepository.java
│
├── model/
│   ├── User.java
│   ├── Job.java
│   ├── Application.java
│
├── dto/
│   ├── LoginRequest.java
│   ├── RegisterRequest.java
│
├── config/
│   ├── SecurityConfig.java
│   ├── JwtFilter.java
│
└── SmartJobPortalApplication.java
```

Frontend structure:

```
frontend/

├── src/
│   ├── components/
│   ├── pages/
│   ├── services/
│   ├── context/
│   ├── App.jsx
│   └── main.jsx
```

---

# 🗄 Database Schema Overview

Main entities:

```
User
 ├── id
 ├── name
 ├── email
 ├── password
 ├── role

Employer
 ├── id
 ├── name
 ├── email
 ├── company_id

Company
 ├── id
 ├── name
 ├── description
 ├── location
 ├── employer_id

Job
 ├── id
 ├── title
 ├── description
 ├── location
 ├── company_id
 ├── employer_id

Application
 ├── id
 ├── user_id
 ├── job_id
 ├── status
 ├── applied_at

Skills
 ├── id
 ├── name
```

---

# 🚀 Getting Started

## Prerequisites

Make sure you have installed:

- JDK 17+
- Node.js 18+
- PostgreSQL
- Maven

---

# 1️⃣ Database Setup

Create database:

```
smart_job_portal
```

Update backend configuration:

`src/main/resources/application.properties`

```
spring.datasource.url=jdbc:postgresql://localhost:8080/smart_job_portal
spring.datasource.username=your_username
spring.datasource.password=your_password

spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=true
spring.jpa.properties.hibernate.dialect=org.hibernate.dialect.PostgreSQLDialect

server.port=8080

jwt.secret=your_secret_key
jwt.expiration=86400000
```

---

# 2️⃣ Backend Setup

Navigate to backend folder:

```
cd backend
```

Run the application:

```
mvn spring-boot:run
```

Backend will run on:

```
http://localhost:8080
```

---

# 3️⃣ Frontend Setup

Navigate to frontend folder:

```
cd frontend
```

Install dependencies:

```
npm install
```

Run frontend:

```
npm run dev
```

Frontend runs on:

```
http://localhost:5173
```

---

# 🔗 API Endpoints Overview

## Authentication

```
POST /api/auth/register
POST /api/auth/login
```

## Jobs

```
GET /api/jobs
GET /api/jobs/{id}
POST /api/jobs
PUT /api/jobs/{id}
DELETE /api/jobs/{id}
```

## Applications

```
POST /api/applications
GET /api/applications/user
GET /api/applications/job/{jobId}
```

---

# 📷 Screenshots


```
/screenshots/home.png
/screenshots/dashboard.png
/screenshots/job-list.png
```

---

# 🎯 Future Improvements

- AI based job recommendation system
- Resume upload and parsing
- Email notifications
- Real-time application updates
- Docker deployment
- Elasticsearch job search

---

# 🤝 Contributing

Pull requests are welcome.

Steps:

```
1 Fork the repository
2 Create a feature branch
3 Commit changes
4 Open Pull Request
```

---

# 📄 License

This project is licensed under the MIT License.

---

# 👨‍💻 Author

Ishu Kumar Rajora  
IET Lucknow  
Full Stack Developer  
Java | Spring Boot | React
