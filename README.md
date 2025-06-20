
# E-Channel Platform

The E-Channel Platform is a web-based appointment booking system designed to digitize healthcare consultations. Built with **Spring Boot** for the backend and **React.js** for the frontend, the system enables patients to book, manage, and cancel medical appointments. It supports role-based access for patients, doctors, and administrative staff.

![E-Channel Platform Screenshot](https://raw.githubusercontent.com/Ilmaa2003/E-Channel-Platform/main/Images/IMG-20250619-WA0030.jpg)

![E-Channel Screenshot](https://raw.githubusercontent.com/Ilmaa2003/E-Channel-Platform/main/Images/IMG-20250619-WA0031.jpg)

![E-Channel Screenshot](https://raw.githubusercontent.com/Ilmaa2003/E-Channel-Platform/main/Images/IMG-20250619-WA0032.jpg)


---

## Tech Stack

- **Backend**: Java Spring Boot (RESTful APIs)
- **Frontend**: React.js
- **Database**: MySQL

---

## Key Features

- Role-based login (Patients, Doctors, Admins)
- Doctor profile and availability management
- Appointment booking, rescheduling, and cancellation
- Admin dashboard for user and appointment management
- RESTful microservices architecture
- API integration with frontend

---

## Development Environment Setup

### Required Tools

| Tool               | Purpose                        | Download Link                                   |
|--------------------|--------------------------------|-------------------------------------------------|
| Java JDK 17+       | Backend runtime                | https://adoptium.net/                           |
| Maven 3.8+         | Java build automation          | https://maven.apache.org/download.cgi           |
| Node.js v18+       | React build and dev server     | https://nodejs.org/                             |
| MySQL Server 8.0+  | Database server                | https://dev.mysql.com/downloads/mysql/          |
| MySQL Workbench    | GUI for database management    | https://dev.mysql.com/downloads/workbench/      |
| Postman            | API testing                    | https://www.postman.com/downloads/              |
| IntelliJ IDEA      | Backend IDE                    | https://www.jetbrains.com/idea/download/        |
| VS Code            | Frontend IDE                   | https://code.visualstudio.com/                  |

---

## MySQL Database Setup

1. Open **MySQL Workbench**
2. Create databases:
   ```sql
   CREATE DATABASE echannel_patient;
   CREATE DATABASE echannel_appointments;
   CREATE DATABASE echannel_doctors;



3. Use these credentials for backend configuration.

---

## Backend Setup (Spring Boot Microservices)

### Microservices

| Service               | Description                    | Port |
| --------------------- | ------------------------------ | ---- |
| `patient-service`     | Manages patient data and login | 8081 |
| `appointment-service` | Handles appointment logic      | 8082 |
| `doctor-service`      | Manages doctor profiles        | 8083 |

### Steps

1. Extract and open each service in **IntelliJ IDEA** in separate windows.
2. Configure the `application.properties` for each service:

**patient-service**

```properties
server.port=8081
spring.datasource.url=jdbc:mysql://localhost:3306/echannel_patient
spring.datasource.username=root
spring.datasource.password=yourpassword
```

**appointment-service**

```properties
server.port=8082
spring.datasource.url=jdbc:mysql://localhost:3306/echannel_appointments
spring.datasource.username=root
spring.datasource.password=yourpassword
```

**doctor-service**

```properties
server.port=8083
spring.datasource.url=jdbc:mysql://localhost:3306/echannel_doctors
spring.datasource.username=root
spring.datasource.password=yourpassword
```

3. Build and run each service:

   * Right-click the main application class in each project (e.g., `DoctorServiceApplication.java`)
   * Click **Run**

---

## Frontend Setup (React.js)

1. Open the `/frontend` folder in **Visual Studio Code**
2. Install dependencies:

   ```bash
   npm install
   ```
3. Create a `.env` file in the `/frontend` directory:

   ```env
   REACT_APP_PATIENT_API=http://localhost:8081/api
   REACT_APP_APPOINTMENT_API=http://localhost:8082/api
   REACT_APP_DOCTOR_API=http://localhost:8083/api
   ```
4. Run the React app:

   ```bash
   npm start
   ```

App available at: [http://localhost:3000](http://localhost:3000)

---

## API Testing with Postman

### Example Endpoints

| Method | Endpoint                | Description           |
| ------ | ----------------------- | --------------------- |
| POST   | `/api/patient/login`    | Login patient         |
| POST   | `/api/patient/register` | Register new patient  |
| POST   | `/api/appointments`     | Book appointment      |
| GET    | `/api/appointments`     | List all appointments |
| GET    | `/api/doctors`          | Fetch all doctors     |

**Headers**

```http
Content-Type: application/json
```

**Authorization Header (if required)**

```http
Authorization: Bearer <your_token_here>
```

---

## Notes

* Ensure MySQL server is running before starting backend services.
* Each service must be launched in a separate IntelliJ window.
* The React app communicates with microservices via environment variables in `.env`.
* Postman is recommended for testing all API endpoints before frontend integration.

---

