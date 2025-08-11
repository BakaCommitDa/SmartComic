/**
 * chat 聊天
 * 
 */
const DEEPSEEK_CHAT_API_URL = 'https://api.deepseek.com/chat/completions';
const KIM_CHAT_API_URL = 'https://api.moonshot.cn/v1/chat/completions';

// console.log(process.env.VITE_DEEPSEEK_API_KEY, '------');
export const chat = async (
    messages, 
    api_url=DEEPSEEK_CHAT_API_URL, 
    api_key=import.meta.env.VITE_DEEPSEEK_API_KEY,
    model='deepseek-chat'
) => {
    try {
        const response = await fetch(api_url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${api_key}`
            },
            body: JSON.stringify({
                model,
                messages,
                stream: false,
            })
        })
        const data = await response.json();
        
        if (!response.ok) {
            throw new Error(data.error?.message || `HTTP ${response.status}: ${response.statusText}`);
        }
        
        if (!data.choices || !data.choices[0] || !data.choices[0].message) {
            throw new Error('API响应格式错误');
        }
        
        return {
            code: 0,
            data: {
                role: 'assistant',
                content: data.choices[0].message.content
            }
        }
    } catch(err) {
        console.error('API调用错误:', err);
        return {
            code: -1,
            msg: err.message || '网络请求失败，请检查网络连接'
        }
   } 
}

export const kimiChat = async (messages) => {
    const res = await chat(
        messages,
        KIM_CHAT_API_URL,
        import.meta.env.VITE_KIMI_API_KEY,
        'moonshot-v1-auto'
    )
    return res;
}
