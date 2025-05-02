# Task Manager Frontend

This is the frontend client for the **Task Manager** application, built with **React.js**.

It allows users to manage projects and their tasks through an interactive and user-friendly interface.

---

## Tech Stack

- **React.js**
- **Redux Toolkit** for state management
- **React Router DOM** for routing
- **Axios** for API requests
- **Tailwind CSS** for styling
- **React Hot Toast** for notifications
- **Lucide React** for icons
- **Vite** (optional based on setup) for faster development build

---

## Setup Instructions

### 1. Clone the repository
```bash
git clone https://github.com/subhash1107/taskmanager.git
cd taskmanager
```

### 2. Install dependencies
```bash
npm install
```

### 3. Set up environment variables

Create a `.env` file in the root folder and add:

```env
VITE_API_URL=http://localhost:5000/api
```

> Adjust the API URL if your backend is deployed elsewhere.

### 4. Start the development server
```bash
npm run dev
```

The app will start at **http://localhost:5173** (or whichever port Vite picks).

---

## Available Pages

- **Login Page** — For user login
- **Register Page** — For user registration
- **Dashboard** — Shows list of projects
- **Create Project Page** — Create a new project (center modal overlay)
- **Task Management** — Create, edit, and delete tasks within a project

---

## Folder Structure

```
taskmanager/
│
├── src/
│   ├── components/        # Reusable React components
│   ├── pages/             # Pages like Login, Register, Dashboard, CreateProject
│   ├── redux/             # Redux slices and store configuration
│   ├── utils/             # Axios instance and helpers
│   ├── App.jsx            # Main App component with routing
│   ├── main.jsx           # Entry point
│
├── public/                # Static files
├── .env                   # Environment variables
├── package.json           # NPM scripts and dependencies
└── tailwind.config.js     # Tailwind CSS configuration
```

---

## Features

- Secure authentication using JWT tokens (stored and used via Redux)
- Project creation and selection
- Task management inside projects (Create, Edit, Delete)
- Toast notifications for success and error feedback
- Responsive and modern UI with Tailwind
- Smooth navigation with protected routes

---

## Important Notes

- This frontend expects the backend to be running and accessible at the API base URL defined in `.env`.
- Make sure you are logged in to access protected routes like dashboard and task management.
- Axios instance is pre-configured with base URL for easier API calls.

---

## License

This project is open-source and free to use for learning and educational purposes.

