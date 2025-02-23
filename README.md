# Full-Stack Coding Challenge

**Deadline**: Sunday, Feb 23th 11:59 pm PST

---

## Overview

Create a “Task Management” application with **React + TypeScript** (frontend), **Node.js** (or **Nest.js**) (backend), and **PostgreSQL** (database). The application should:

1. **Register** (sign up) and **Log in** (sign in) users.
2. After logging in, allow users to:
   - **View a list of tasks**.
   - **Create a new task**.
   - **Update an existing task** (e.g., mark complete, edit).
   - **Delete a task**.

Focus on **correctness**, **functionality**, and **code clarity** rather than visual design.  
This challenge is intended to be completed within ~3 hours, so keep solutions minimal yet functional.

---

## Requirements

### 1. Authentication

- **User Model**:
  - `id`: Primary key
  - `username`: Unique string
  - `password`: Hashed string
- **Endpoints**:
  - `POST /auth/register` – Create a new user
  - `POST /auth/login` – Login user, return a token (e.g., JWT)
- **Secure the Tasks Routes**: Only authenticated users can perform task operations.  
  - **Password Hashing**: Use `bcrypt` or another hashing library to store passwords securely.
  - **Token Verification**: Verify the token (JWT) on each request to protected routes.

### 2. Backend (Node.js or Nest.js)

- **Tasks CRUD**:  
  - `GET /tasks` – Retrieve a list of tasks (optionally filtered by user).  
  - `POST /tasks` – Create a new task.  
  - `PUT /tasks/:id` – Update a task (e.g., mark as complete, edit text).  
  - `DELETE /tasks/:id` – Delete a task.
- **Task Model**:
  - `id`: Primary key
  - `title`: string
  - `description`: string (optional)
  - `isComplete`: boolean (default `false`)
  - _(Optional)_ `userId` to link tasks to the user who created them
- **Database**: PostgreSQL
  - Provide instructions/migrations to set up:
    - `users` table (with hashed passwords)
    - `tasks` table
- **Setup**:
  - `npm install` to install dependencies
  - `npm run start` (or `npm run dev`) to run the server
  - Document any environment variables (e.g., database connection string, JWT secret)

### 3. Frontend (React + TypeScript)

- **Login / Register**:
  - Simple forms for **Register** and **Login**.
  - Store JWT (e.g., in `localStorage`) upon successful login.
  - If not authenticated, the user should not see the tasks page.
- **Tasks Page**:
  - Fetch tasks from `GET /tasks` (including auth token in headers).
  - Display the list of tasks.
  - Form to create a new task (`POST /tasks`).
  - Buttons/fields to update a task (`PUT /tasks/:id`).
  - Button to delete a task (`DELETE /tasks/:id`).
- **Navigation**:
  - Show `Login`/`Register` if not authenticated.
  - Show `Logout` if authenticated.
- **Setup**:
  - `npm install` then `npm start` (or `npm run dev`) to run.
  - Document how to point the frontend at the backend (e.g., `.env` file, base URL).

---

## Deliverables

1. **Fork the Public Repository**: **Fork** this repo into your own GitHub account.
2. **Implement Your Solution** in the forked repository. Make sure you're README file has:
   - Steps to set up the database (migrations, environment variables).
   - How to run the backend.
   - How to run the frontend.
   - Any relevant notes on testing.
   - Salary Expectations per month (Mandatory)
3. **Short Video Demo**: Provide a link (in a `.md` file in your forked repo) to a brief screen recording showing:
   - Registering a user
   - Logging in
   - Creating, updating, and deleting tasks
4. **Deadline**: Submissions are due **Sunday, Feb 23th 11:59 pm PST**.

> **Note**: Please keep your solution minimal. The entire project is intended to be completed in around 3 hours. Focus on core features (registration, login, tasks CRUD) rather than polished UI or extra features.

---

## Evaluation Criteria

1. **Functionality**  
   - Does registration and login work correctly (with password hashing)?
   - Are tasks protected by authentication?
   - Does the tasks CRUD flow work end-to-end?

2. **Code Quality**  
   - Is the code structured logically and typed in TypeScript?
   - Are variable/function names descriptive?

3. **Clarity**  
   - Is the `README.md` (in your fork) clear and detailed about setup steps?
   - Easy to run and test?

4. **Maintainability**  
   - Organized logic (controllers/services, etc.)
   - Minimal hard-coded values

Good luck, and we look forward to your submission!

**Answer:**
# Lumaa Spring 2025 SWE

## 🚀 Live Project Link
[Click Here](YOUR_LIVE_PROJECT_LINK_HERE)

## 📌 Project Setup & Installation

### 1️⃣ Clone the Repository
```sh
git clone https://github.com/hartik123/lumaa-spring-2025-swe.git
cd lumaa-spring-2025-swe
```

### 2️⃣ Setup & Run the Frontend
```sh
cd frontend
npm install
npm start  # Starts the frontend application
```

### 3️⃣ Setup & Run the Backend
#### Open a new terminal and run:
```sh
cd backend
npm install
```

### 4️⃣ Create a `.env` File
Create a `.env` file inside the `backend` folder and add the following variables:
```sh
DATABASE_URL="mongodb+srv://hartik:Suhagiya%40123@cluster0.ewf0cut.mongodb.net/taskmanager?retryWrites=true&w=majority&appName=Cluster0"
PORT=8000
JWT_SECRET="secretkeyappearshere"
```

### 5️⃣ Start the Backend Server
```sh
node app.js
```

---

## 🎯 Features Developed

### ✅ User SignUp  
![User SignUp](https://github.com/user-attachments/assets/b78c7277-7968-4168-ba73-b34d8a03f245)

### ✅ User Login  
![User Login](https://github.com/user-attachments/assets/7e1e25a0-0520-43de-8bf3-8e45d575f698)

### ✅ User Create Task  
![Create Task](https://github.com/user-attachments/assets/009f5e71-6d31-4123-8600-094b4d54e713)  
![Create Task](https://github.com/user-attachments/assets/2ebc7d2f-8781-424a-9bfd-7a1cf2196e9e)

### ✅ User Update Task  
![Update Task](https://github.com/user-attachments/assets/a1f3a489-d8c6-42b8-9507-57a952f18761)

### ✅ User Read Task  
![Read Task](https://github.com/user-attachments/assets/17507bde-8279-4b63-b88e-ed67a300f491)

### ✅ User Delete Task  
🗑 Pressing the red delete button removes the task from the user's Task List.

---

## 📌 Tech Stack
- **Frontend:** React.js (with Hooks & Context API)
- **Backend:** Node.js, Express.js
- **Database:** MongoDB (Mongoose ORM)
- **Authentication:** JWT (JSON Web Token)
- **Hosting:** Netlify (Frontend), Render (Backend)

---

## 📞 Contact
For any queries or contributions, feel free to reach out!

🔗 **GitHub:** [hartik123](https://github.com/hartik123)  
✉️ **Email:** hartik.suhagiya@example.com


