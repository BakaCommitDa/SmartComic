// 导出所有工具函数
export { debounce, throttle } from './debounce';

/**
 * 格式化数字
 * @param {number} num 数字
 * @returns {string} 格式化后的字符串
 */
export const formatNumber = (num) => {
  if (num >= 10000) {
    return (num / 10000).toFixed(1) + '万';
  }
  return num.toString();
};

/**
 * 截断文本
 * @param {string} text 文本
 * @param {number} length 最大长度
 * @returns {string} 截断后的文本
 */
export const truncateText = (text, length = 20) => {
  if (text.length <= length) return text;
  return text.substring(0, length) + '...';
};

/**
 * 生成唯一ID
 * @returns {string} 唯一ID
 */
export const generateId = () => {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
};

/**
 * 深拷贝对象
 * @param {any} obj 要拷贝的对象
 * @returns {any} 拷贝后的对象
 */
export const deepClone = (obj) => {
  if (obj === null || typeof obj !== 'object') return obj;
  if (obj instanceof Date) return new Date(obj.getTime());
  if (obj instanceof Array) return obj.map(item => deepClone(item));
  if (typeof obj === 'object') {
    const clonedObj = {};
    for (const key in obj) {
      if (obj.hasOwnProperty(key)) {
        clonedObj[key] = deepClone(obj[key]);
      }
    }
    return clonedObj;
  }
}; 