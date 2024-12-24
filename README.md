# Dairy Farm Management System

## Overview
The Dairy Farm Management System is a comprehensive platform designed to help farmers and farm administrators efficiently manage their dairy farming operations. This system leverages modern web technologies and tools to track livestock, manage milk production, monitor diseases, and maintain records of farm activities.

## Features
- **Cow Management:** Track the number of cows assigned to each user.
- **Milk Production:** Monitor and calculate the total milk production by user.
- **Birth Records:** Keep track of births over the past year.
- **Disease Monitoring:** Count examinations for specific diseases like Brucellosis, Botulism, and Bluetongue.
- **Interactive Dashboard:** View and analyze key statistics such as the number of cows, births, milk production, and disease counts with a user-friendly interface.

## Technologies Used
### Frontend:
- **React.js:** Core framework for building the user interface.
- **Chakra UI:** For responsive and modern UI components.
- **React Hooks:** Manage state and lifecycle in functional components.

### Backend:
- **Node.js:** Runtime environment.
- **Express.js:** Backend framework for creating APIs.
- **File System (fs):** For data storage and manipulation in JSON format.
- **UUID:** Generate unique IDs for database entries.

### Database:
- **JSON File Storage:** Simple file-based database to store cows, births, milk production, and disease examination data.

  ## Installation

### 1. Clone the repository:
  ```bash
   git clone https://github.com/abdel-ouahab/dairy-farm-management-system.
   cd dairy-farm-management-system
  ```

### 2. Set up the Backend (Node.js/Express):
#### 1. Navigate to the backend folder:
  ```bash
  cd server
  ```
#### 2. Install dependencies:
  ```bash
  npm install
  ```
#### 3. Create a dev.env file for environment variables:
  ```bash
  npm install dotenv
  ```
Add the following to .env (replace with your own values):
  ```bash
  PORT=5000
  SECERT=mySecretKey
  ```
#### 4. Start the backend server:
  ```bash
  npm start
  ```
The backend should now be running at http://localhost:5000.

### 3. Set up the Frontend (React):
#### 1. Navigate to the frontend folder:
  ```bash
  cd client
  ```
#### 2. Install dependencies:
  ```bash
  npm install
  ```
#### 3. Create a .env file for environment variables:
  ```bash
  npm i react-dotenv
  ```
Add the following to .env:
  ```bash
  REACT_APP_API_AUTH = "http://127.0.0.1:5000/api/auth"
  REACT_APP_API = "http://127.0.0.1:5000/api"
  ```
#### 4. Start the frontend server:
  ```bash
  npm start
  ```
The frontend should now be running at http://localhost:3000.

## Usage
1. **Login to the Employee Portal:** View statistics related to cows, milk production, births, and diseases.
2. **Add Data:** Use APIs to add cows, record births, and log disease examinations.
3. **Visualize Data:** Leverage the frontend dashboard to monitor and analyze farm metrics in real-time.

