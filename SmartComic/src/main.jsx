import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import 'lib-flexible' // 移动端适配
import {
 BrowserRouter as Router
} from 'react-router-dom';

// 引入mock服务器
if (import.meta.env.DEV) {
  import('../mock/mockServer.js').catch(err => {
    console.error('Mock服务器加载失败:', err)
  })
}

createRoot(document.getElementById('root')).render(
    <Router>
        <App />
    </Router>,
)
