import {
  useEffect,
  useState
} from 'react';
import {
  Button,
  Input,
  Loading,
  Toast
} from 'react-vant'

import useTitle from '@/hooks/useTitle'
import {
  chat
} from '@/llm'
import styles from './aniGenie.module.css';
import {
  ChatO,
  UserO
} from '@react-vant/icons';

const AniGenie = () => {
  useTitle('动漫精灵')
  const [text, setText] = useState("");
  const [isSending, setIsSending] = useState(false);
  
  const [messages, setMessages] = useState([
      {
          id: 1,
          content: '你好！我是你的动漫精灵助手，有什么可以帮助你的吗？',
          role: 'assistant'
      }
  ]);

  const handleChat = async () => {
      if (text.trim() === "") {
          Toast.info({
              message: '内容不能为空'
          })
          return 
      }
      setIsSending(true)
      const userMessage = text;
      setText("")
      
      // 添加用户消息
      setMessages((prev) => {
          return [
              ...prev,
              {
                  id: Date.now(),
                  role: 'user',
                  content: userMessage
              }
          ]
      })
      
      try {
          const newMessage = await chat([{
              role: 'user',
              content: userMessage
          }]);
          
          // 添加助手回复
          setMessages((prev) => {
              return [
                  ...prev,
                  {
                      id: Date.now() + 1,
                      role: 'assistant',
                      content: newMessage.data.content || '抱歉，我现在无法回复，请稍后再试。'
                  }
              ]
          });
      } catch (error) {
          console.error('聊天出错:', error);
          setMessages((prev) => {
              return [
                  ...prev,
                  {
                      id: Date.now() + 1,
                      role: 'assistant',
                      content: '抱歉，网络连接出现问题，请稍后再试。'
                  }
              ]
          });
      }
      
      setIsSending(false);
  }

  const handleKeyPress = (e) => {
      if (e.key === 'Enter' && !e.shiftKey) {
          e.preventDefault();
          handleChat();
      }
  }

  return (
      <div className={styles.chatContainer}>
          <div className={styles.chatArea}>
              {messages.map((msg, index) => (
                  <div 
                      key={msg.id || index}
                      className={`${styles.messageContainer} ${
                          msg.role === 'user' ? styles.userMessage : styles.assistantMessage
                      }`}
                  >
                      <div className={styles.messageBubble}>
                          {msg.content}
                      </div>
                  </div>
              ))}
              {isSending && (
                  <div className={`${styles.messageContainer} ${styles.assistantMessage}`}>
                      <div className={styles.messageBubble}>
                          <div className={styles.typingIndicator}>
                              <span></span>
                              <span></span>
                              <span></span>
                          </div>
                      </div>
                  </div>
              )}
          </div>
          
          <div className={styles.inputArea}>
              <div className={styles.inputContainer}>
                  <Input
                      value={text}
                      onChange={(e) => setText(e)}
                      onKeyPress={handleKeyPress}
                      placeholder="给动漫精灵发送消息"
                      className={styles.input}
                      multiline
                      rows={1}
                      autoSize
                  />
                  <button 
                      disabled={isSending || !text.trim()} 
                      onClick={handleChat}
                      className={styles.sendButton}
                  >
                      发送
                  </button>
              </div>
          </div>
      </div>
  )
}

export default AniGenie