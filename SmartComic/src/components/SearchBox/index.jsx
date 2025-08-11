import { useState, useCallback, useRef, memo, useEffect } from 'react';
import { Search as SearchIcon, ArrowLeft } from '@react-vant/icons';
import { Search } from 'react-vant';
import { useNavigate } from 'react-router-dom';
import { useDebounce } from '@/hooks';
import styles from './searchBox.module.css';

const SearchBox = memo(({ handleQuery, placeholder = "今天你想看些什么?", onSearch, onInputChange, value: externalValue }) => {
    const [inputValue, setInputValue] = useState('');
    const navigate = useNavigate();
    const lastQueryRef = useRef('');

    // 同步外部传入的value
    useEffect(() => {
        if (externalValue !== undefined && externalValue !== inputValue) {
            setInputValue(externalValue);
        }
    }, [externalValue, inputValue]);

    // 使用hooks中的防抖Hook
    const debouncedHandleQuery = useDebounce((value) => {
        // 避免重复调用相同的查询
        if (value === lastQueryRef.current) {
            return;
        }
        
        lastQueryRef.current = value;
        handleQuery(value);
    }, 150);

    const handleInputChange = useCallback((value) => {
        setInputValue(value);
        
        // 通知父组件输入值变化（用于自动填充）
        if (onInputChange) {
            onInputChange(value);
        }
        
        // 防抖调用搜索
        debouncedHandleQuery(value);
    }, [debouncedHandleQuery, onInputChange]);

    const handleBack = useCallback(() => {
        navigate(-1);
    }, [navigate]);

    const handleSearch = useCallback(() => {
        if (inputValue.trim() && onSearch) {
            onSearch(inputValue.trim());
        }
    }, [inputValue, onSearch]);

    const handleKeyPress = useCallback((e) => {
        if (e.key === 'Enter') {
            handleSearch();
        }
    }, [handleSearch]);

    return (
        <div className={styles.searchBox}>
            <div className={styles.header}>
                <div className={styles.backBtn} onClick={handleBack}>
                    <ArrowLeft />
                </div>
                <div className={styles.searchWrapper}>
                    <Search
                        value={inputValue}
                        onChange={handleInputChange}
                        placeholder={placeholder}
                        className={styles.searchInput}
                        style={{
                            minHeight: '72px',
                            height: '72px',
                            maxHeight: '72px'
                        }}
                        onSearch={handleSearch}
                    />
                </div>
                <button 
                    className={styles.searchBtn}
                    onClick={handleSearch}
                >
                    搜索
                </button>
            </div>
        </div>
    );
});

SearchBox.displayName = 'SearchBox';

export default SearchBox; 