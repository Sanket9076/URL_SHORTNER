# URL Shortener

A modern full-stack URL shortening application built with React, Vite, Node.js, Express, and MongoDB.

## Demo

![URL Shortener Demo](demo.webp)

## Features
- **User Authentication**: Secure sign up and login functionality using JWT and bcrypt.
- **URL Shortening**: Convert long, clunky URLs into short, easy-to-manage links.
- **Link Management**: View your entire history of shortened links along with the total number of clicks each link has received on your personal dashboard.
- **Modern UI**: Clean, responsive, and dynamic interface featuring 3D animated background typography using Three.js and fluid animations via Framer Motion.

## Tech Stack
**Frontend**: React 18, Vite, Tailwind CSS, Framer Motion, React Three Fiber, React Router, Redux Toolkit
**Backend**: Node.js, Express.js, MongoDB, Mongoose, JSON Web Tokens (JWT)

## Getting Started

### Prerequisites
- Node.js (v18+)
- MongoDB (Running locally or via Atlas)

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/Sanket9076/URL_SHORTNER.git
   cd URL_SHORTNER
   ```

2. Install backend dependencies:
   ```bash
   cd BACKEND
   npm install
   ```

3. Install frontend dependencies:
   ```bash
   cd ../FRONTEND
   npm install
   ```

### Running Locally

1. Start the Backend Server (Default Port: 3000)
   ```bash
   cd BACKEND
   npm run dev
   ```

2. Start the Frontend Application (Default Port: 5173)
   ```bash
   cd FRONTEND
   npm run dev
   ```

Open your browser and navigate to `http://localhost:5173`.
