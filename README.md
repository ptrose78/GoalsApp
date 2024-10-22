# GoalGetter App - README

## Overview

GoalGetter is a React-based web application designed to help users set, manage, and track their goals, tasks, and to-do items. Built with Redux for state management and a MySQL backend, the app enables users to easily organize goals, assign tasks, and manage to-do lists. This readme outlines the key features, setup instructions, and application architecture.

## Features
- **Goal Management:** Create, edit, and delete goals. Each goal can have associated tasks.
- **Task Management:** Assign tasks with resources and notes to specific goals.
- **To-do List:** Add tasks as to-dos, remove completed to-dos, and navigate between to-do items and their associated goals and tasks.
- **Data Persistence:** The app communicates with a MySQL backend for goal, task, and to-do data storage.

## Tech Stack

- **Frontend:** React, Redux, React Router
- **Backend:** Node.js, Express.js, MySQL
- **State Management:** Redux (with `useDispatch` and `useSelector`)
- **Styling:** Basic CSS for layout and components
- **UUID:** For unique identifier generation

## Installation and Setup

### Prerequisites
Ensure you have the following installed:

- Node.js
- MySQL Database
- npm (Node Package Manager)

### Steps

1. **Clone the Repository:**
   ```bash
   git clone https://github.com/your-username/goalgetter.git
   cd goalgetter
   ```

2. **Install Dependencies:**
   ```bash
   npm install
   ```

3. **Create Environment Variables:**
   Create a `.env` file at the root of your project and add your MySQL database credentials:
   ```
   HOST=your_mysql_host
   USER=your_mysql_user
   PASSWORD=your_mysql_password
   DATABASE=goalgetter
   ```

4. **Run MySQL Migrations:**
   Import the provided SQL schema (located in the Backend Folder called GoalGetterMySQLScript.sql) to create the necessary tables in your MySQL database.

5. **Start the Backend Server:**
   ```bash
   npm run server
   ```
   The server will run on `http://localhost:4000`.

6. **Run the Frontend:**
   ```bash
   npm start
   ```
   The app will run on `http://localhost:3000`.

