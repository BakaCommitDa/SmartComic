// components/LottieAnimation.jsx
import { useEffect, useRef } from 'react';
import lottie from 'lottie-web';

export default function LottieAnimation({ path, loop = true, autoplay = true, width = 60, height = 60 }) {
  const container = useRef(null);

  useEffect(() => {
    const load = async () => {
      try {
        const response = await fetch(path);

        if (!response.ok) {
          throw new Error(`文件未找到: ${response.status} ${response.statusText}`);
        }

        const contentType = response.headers.get('content-type');
        if (!contentType || !contentType.includes('application/json')) {
          const text = await response.text();
          console.error('返回内容不是 JSON:', text.slice(0, 100));
          throw new Error('返回了 HTML，不是 JSON。请检查文件是否在 public/lottie/ 下');
        }

        const data = await response.json();

        if (container.current) {
          const anim = lottie.loadAnimation({
            container: container.current,
            renderer: 'svg',
            animationData: data,
            loop,
            autoplay,
          });

          return () => anim.destroy();
        }
      } catch (error) {
        console.error('Lottie 加载失败:', error);
      }
    };

    load();
  }, [path, loop, autoplay]);

  return (
    <div
      ref={container}
      style={{ 
        width, 
        height, 
        display: 'inline-block',
        margin: 0,
        padding: 0
      }}
    />
  );
}