import React, { useState } from 'react';

function Chatbot(){
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState('');

    const sendMessage = async() => {
        if (input.trim() === '') return;

        const userMessage = { sender: 'user', text: input };
        setMessages(prev =>[...prev, userMessage]);

        try{
            const res = await fetch('http://localhost:5000/ask',{
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({ question: input})
            });

            const data = await res.json();
            const botMessage = { sender: 'bot', text: data.answer};
            setMessages(prev => [...prev, botMessage]);
        } catch (err){
            setMessages(prev =>[...prev, {sender: 'bot', text: "Server Error!"}]);
        }
        setInput('');
    };
    const handleFeedback = async (question, answer, feedback) => {
        try{
            await fetch('http://localhost:5000/feedback', {
                method:'POST',
                headers:{'Content-Type':'application/json'},
                body: JSON.stringify({question, answer, feedback})
            });
            console.log('Feedback sent');
        } catch(err){
            console.error("Error sending feedback:", err);
        }
    };
    return(
        <div style={styles.container}>
            <h2>FAQ Chatbot</h2>
        <div style={styles.chatBox}>
            {messages.map((msg, index)=> (
            <div key={index} style={{textAlign:msg.sender === 'user' ? 'right' : 'left',color: 'white',
            padding:'20px',
            marginBottom: '8px',}}>
                {msg.text}
                {msg.sender === 'bot' && index > 0 && messages[index - 1].sender === 'user' && (
                    <div style={{marginTop:'5px'}}>
        <button onClick={() => handleFeedback(messages[index-1].text,msg.text,'👍')}>👍</button>
        <button onClick={() => handleFeedback(messages[index-1].text,msg.text, '👎')}>👎</button>
            </div>
                )}
        </div>  
            ))}
            </div>
        <div style={styles.inputArea}>
            <input
  value={input}
  onChange={(e) => setInput(e.target.value)}
  onKeyPress={(e) => {
    if (e.key === 'Enter') sendMessage();
  }}
  style={styles.input}
  placeholder="Ask something..."
/>

            <button onClick={sendMessage} style={styles.button}>Send</button>
        </div>
        </div>
    );
}
const styles = {
  container: {
    width: '100%',
    fontFamily: 'Arial, sans-serif',
    background: '#0f172a',
    color: '#fff',
    height: '100vh',
    display: 'flex',
    flexDirection: 'column',
  },
  chatBox: {
    flex: 1,
    padding: '8px',
    overflowY: 'auto',
    background: '#1e293b',
  },
  inputArea: {
    display: 'flex',
    padding: '10px',
    background: '#1e293b',
    borderTop: '1px solid #334155',
  },
  input: {
    flex: 1,
    padding: '8px',
    background: '#334155',
    color: '#f1f5f9',
    border: '1px solid #475569',
    borderRadius: '4px',
    outline: 'none',
  },
  button: {
    marginLeft: '10px',
    padding: '8px 16px',
    background: '#facc15',
    color: '#1e293b',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
  },
};



export default Chatbot;