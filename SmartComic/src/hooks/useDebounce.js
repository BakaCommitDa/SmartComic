import { useRef, useCallback } from 'react';

/**
 * 防抖Hook
 * @param {Function} callback 回调函数
 * @param {number} delay 延迟时间（毫秒）
 * @returns {Function} 防抖后的函数
 */
export const useDebounce = (callback, delay = 300) => {
  const timeoutRef = useRef(null);
  
  return useCallback((...args) => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    
    timeoutRef.current = setTimeout(() => {
      callback(...args);
    }, delay);
  }, [callback, delay]);
};

/**
 * 防抖Hook（简化版）
 * @param {Function} callback 回调函数
 * @param {number} delay 延迟时间
 * @returns {Function} 防抖后的函数
 */
export const useDebounceCallback = (callback, delay = 300) => {
  const timeoutRef = useRef(null);
  
  return useCallback((...args) => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    
    timeoutRef.current = setTimeout(() => {
      callback(...args);
    }, delay);
  }, [callback, delay]);
}; 