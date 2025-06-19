# web-projects

This repository contains two full-stack web development projects built during my internship. These projects demonstrate skills in frontend design, backend development, database integration, and AI-powered user interaction.

## 1. ResumAI – SaaS-Style Landing Page with Email Verification

Folder: `/SAAS LANDING PAGE`

### Features:
- Conversion-optimized landing page using Tailwind CSS
- Sign-up form with validation
- Email verification via Nodemailer (Gmail)
- Data stored in MongoDB
- Thank-you page shown after verification
- Passwords can be secured using bcrypt (optional)

### Tech Stack:
- **Frontend**: HTML, Tailwind CSS, JavaScript
- **Backend**: Node.js, Express.js
- **Database**: MongoDB with Mongoose
- **Email**: Nodemailer + Gmail App Password
- **Security**: bcrypt for password hashing, dotenv for .env

### Project Structure – ResumAI

├── backend
│ ├── models
│ │ └── User.js
│ ├── public
│ │ └── thankyou.html
│ ├── .env
│ ├── server.js 
│ └── package.json
├── index.html (Landing Page)



---

## 2. FAQ Chatbot – AI-Powered Question Answering System

Folder: `/FAQ-CHATBOT`

### Features:
- React-based chatbot interface
- Express backend with Node.js
- Answers predefined FAQs using OpenAI or fallback keyword matching
- Stores feedback and unanswered questions in `.txt` files
- Uses `.env` for safe API key storage

### Tech Stack:
- **Frontend**: React.js, Tailwind CSS
- **Backend**: Node.js, Express.js
- **AI/NLP**: OpenAI API or logic-based fallback
- **Storage**: MongoDB or `.txt` logging

### Project Structure – FAQ Chatbot

/FAQ-CHATBOT
├── backend
│ ├── index.js
│ ├── feedback_log.txt
│ ├── unanswered_questions.txt
│ ├── .env
│ └── package.json
├── frontend
│ ├── src
│ │ ├── App.js
│ │ └── Chatbot.jsx
│ └── public
