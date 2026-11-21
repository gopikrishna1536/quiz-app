# SmartQuiz — Full-Stack Technical Assessment Platform

[![Node.js](https://img.shields.io/badge/Node.js-20%2B-339933?style=for-the-badge&logo=node.js&logoColor=white)](https://nodejs.org/)
[![Express](https://img.shields.io/badge/Express-4-000000?style=for-the-badge&logo=express&logoColor=white)](https://expressjs.com/)
[![Docker](https://img.shields.io/badge/Docker-Enabled-2496ED?style=for-the-badge&logo=docker&logoColor=white)](https://www.docker.com/)
[![Testing](https://img.shields.io/badge/Tests-Passing-25A162?style=for-the-badge)](tests/)
[![License](https://img.shields.io/badge/License-MIT-blue?style=for-the-badge)](LICENSE)

An interactive, responsive full-stack quiz and technical assessment web application built with Node.js, Express, and modern JavaScript. Features multi-category technical questions, instant automated grading, detailed explanations, and Docker containerization.

---

## ✨ Features

- **Categorized Question Bank:** Assessments across Computer Science fundamentals, Python, JavaScript, and Cloud Computing.
- **Client-Side Answer Security:** Server sanitizes questions on retrieval, withholding answer keys until post-submission evaluation.
- **Dynamic Scoring & Feedback:** Immediate grade calculation (`A+` to `F`), percentage tracking, and detailed answer rationale breakdowns.
- **Modern Responsive UI:** Single-page application with real-time question progress bar and smooth category switching.
- **Automated Testing & CI:** Unit tests covering grading edge cases and GitHub Actions continuous integration.

---

## 📂 Project Structure

```
quiz-app/
├── .github/
│   └── workflows/
│       └── ci.yml                 # GitHub Actions automated test pipeline
├── data/
│   └── questions.json             # Categorized technical question database
├── lib/
│   └── grader.js                  # Scoring engine & answer evaluation logic
├── public/
│   ├── app.js                     # Client SPA logic & API connector
│   ├── index.html                 # Semantic HTML interface
│   └── style.css                  # Modern responsive styling
├── tests/
│   └── grader.test.js             # Automated unit tests
├── Dockerfile                     # Production container definition
├── docker-compose.yml             # Container orchestration
├── package.json                   # Dependencies & npm scripts
└── README.md                      # Documentation
```

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18 or higher
- Optional: Docker

### Option A: Running with Docker Compose

```bash
docker-compose up -d --build
```
Access the application at `http://localhost:3000`.

---

### Option B: Local Execution

1. **Clone the repository:**
   ```bash
   git clone https://github.com/gopikrishna1536/quiz-app.git
   cd quiz-app
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Run automated test suite:**
   ```bash
   npm test
   ```

4. **Launch development server:**
   ```bash
   node server.js
   ```

---

## 📄 License
MIT License.
