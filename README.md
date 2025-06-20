# web-projects

This repository contains two web development projects built for internship submission:

## 1. ResumAI – SaaS-Style Landing Page with Email Verification

Folder: `saas-landing-page`

### Features:
- Eye-catching landing page using Tailwind CSS
- Sign-up form with client-side validation
- Email verification using Nodemailer (Gmail App Password)
- Data stored securely in MongoDB
- Thank-you page shown after successful verification
- Optional: Passwords can be hashed using bcrypt

### Tools Used:
- **Frontend**: HTML, Tailwind CSS, JavaScript
- **Backend**: Node.js, Express.js
- **Database**: MongoDB with Mongoose
- **Email**: Nodemailer + Gmail App Password
- **Security**: bcrypt (optional), dotenv for managing secrets

### Environment Variables

Create a `.env` file inside `/saas-landing-page/backend/` based on the `.env.example` provided.

### Project Structure – ResumAI

saas-landing-page/
├── backend/
│ ├── models/
│ │ └── User.js
│ ├── public/
│ │ └── thankyou.html
│ ├── .env.example
│ ├── server.js
│ └── package.json
└── frontend/
└── index.html


## 2. FAQ Chatbot – AI-Powered Question Answering System

Folder: `faq-chatbot`

### Features:
- Interactive chatbot interface built with React
- Express backend for message handling
- Answers predefined FAQs using OpenAI API or fallback logic
- Feedback and unanswered questions stored in `.txt` logs
- Frontend and backend fully separated
- Uses `.env` for secure API keys

### Tools Used:
- **Frontend**: React.js, Tailwind CSS
- **Backend**: Node.js, Express.js
- **AI/NLP**: OpenAI API or rule-based fallback
- **Storage**: Text logs or optional MongoDB

### Environment Variables

Create a `.env` file inside `/faq-chatbot/backend/` based on the `.env.examples` provided.

### Project Structure – FAQ Chatbot

faq-chatbot/
├── backend/
│ ├── index.js
│ ├── feedback_log.txt
│ ├── unanswered_questions.txt
│ ├── .env.examples
│ └── package.json
├── frontend/
│ ├── App.js
│ ├── Chatbot.jsx
│ └── index.js
└── chatbot-report.pdf
