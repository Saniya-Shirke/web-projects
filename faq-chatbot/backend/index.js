const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const natural = require('natural');
const fs = require('fs');
require('dotenv').config(); // Load .env variables
console.log("🔑 Your OpenAI key is:", process.env.OPENAI_API_KEY);


const OpenAI = require('openai');
 // Import OpenAI SDK

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});



const app = express();
const PORT = 5000;

app.use(cors());
app.use(bodyParser.json());

const faqData = [
  { question: "what is your name", answer: "I am your FAQ Bot." },
  { question: "who are you", answer: "I am your FAQ Bot." },
  { question: "how can i contact support", answer: "You can contact support via email at support@example.com." },
  { question: "where are you located", answer: "We are located in Mumbai, India." },
  { question: "what is your location", answer: "We are located in Mumbai, India." },
  { question: "what are your working hours", answer: "Our working hours are 9 AM to 6 PM, Monday to Friday." },
  { question: "how do i reset my password", answer: "Click on 'Forgot Password' at login to reset your password." },
  { question: "can i speak to an agent", answer: "You can reach out to a live agent via our support page." },
  { question: "how do i update my profile", answer: "Go to Settings > Profile to update your details." },
  { question: "is my data safe", answer: "Yes, your data is encrypted and securely stored." },
  { question: "do you support multiple languages", answer: "Currently, we support English only." },
  { question: "how can i delete my account", answer: "Please contact support to delete your account permanently." },
  { question: "do you have a mobile app", answer: "Yes, our app is available on Android and iOS." },
  { question: "can i get a refund", answer: "Refunds are processed according to our refund policy." },
  { question: "how do i change my email", answer: "You can change your email in your account settings." },
  { question: "how do i report a bug", answer: "You can report bugs using the Feedback button or by email." },
  { question: "do you offer discounts", answer: "We offer seasonal discounts. Subscribe to our newsletter for updates." }
];


function findAnswer(userQuestion) {
  const TfIdf = natural.TfIdf;
  const tfidf = new TfIdf();

  // Add all FAQ questions to the TF-IDF model
  faqData.forEach((faq, index) => {
    tfidf.addDocument(faq.question.toLowerCase(), index.toString());
  });

  let bestMatchIndex = -1;
  let bestScore = 0;

  tfidf.tfidfs(userQuestion.toLowerCase(), (i, measure) => {
    if (measure > bestScore) {
      bestScore = measure;
      bestMatchIndex = i;
    }
  });

  // Check if match is confident enough
  if (bestScore > 0.2) {
    return faqData[bestMatchIndex].answer;
  } else {
    return null;
  }
}
function logUnansweredQuestion(question){
  const log = `Unanswered: "${question}" - ${new Date().toLocaleString()}\n`;
  fs.appendFile('unanswered_questions.txt', log, (err) => {
    if(err) console.error('Error writing to unanswered_questions.txt:', err);
  });
}



// ✅ THIS IS YOUR IMPORTANT ROUTE
app.post('/ask', async (req, res) => {
  console.log("✅ POST /ask hit:", req.body);
  const userQuestion = req.body.question;
  const answer = findAnswer(userQuestion);

  if (answer) {
    return res.json({ answer });
  }

  try {
    // Fallback to OpenAI
   const response = await openai.chat.completions.create({
  model: "gpt-3.5-turbo",
  messages: [
    { role: "system", content: "You are a helpful customer support assistant." },
    { role: "user", content: userQuestion }
  ],
  max_tokens: 100,
  temperature: 0.7
});

    const aiAnswer = response.data.choices[0].message.content.trim();
    console.log("💡 AI Answer:", aiAnswer);

    res.json({ answer: aiAnswer });

  } catch (error) {
    console.error("OpenAI API Error:", error.message);
    logUnansweredQuestion(userQuestion);  // Save only if both FAQ and AI fail
    res.json({ answer: "Sorry, I'm unable to answer your question at the moment." });
  }
});

app.post('/feedback', (req, res) => {
  const {question, feedback} = req.body;

  const log = `Q: ${question} | Feedback:${feedback}\n`;

  fs.appendFile('feedback_log.txt', log, err =>{
    if(err){
      console.error("Error saving feedback:", err);
      return res.status(500).json({success:false});
    }
    console.log("Feedback saved:", log.trim());
    res.json({successs:true});
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
