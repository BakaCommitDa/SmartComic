import SearchBox from "@/components/SearchBox";
import useSearchStore from "@/store/useSearchStore";
import { Search as SearchIcon } from '@react-vant/icons';
import styles from './search.module.css';
import {
    useState,
    useEffect,
    memo,
    useCallback
} from 'react';

// 简单的删除图标组件
const DeleteIcon = () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z" fill="currentColor"/>
    </svg>
);

const HistorySection = memo(({ history, onHistoryClick, onClearHistory, onRemoveHistory }) => {
    return (
        <div className={styles.historySection}>
            <div className={styles.sectionHeader}>
                <h2>历史记录</h2>
                <button 
                    className={styles.clearBtn}
                    onClick={onClearHistory}
                    title="清除历史记录"
                >
                    <DeleteIcon />
                </button>
            </div>
            <div className={styles.historyGrid}>
                {history.length === 0 ? (
                    <div className={styles.emptyHistoryState}>
                        暂无搜索历史
                    </div>
                ) : (
                    history.map((item, index) => (
                        <div 
                            key={`${item}-${index}`} 
                            className={styles.historyItem}
                            onClick={() => onHistoryClick(item)}
                        >
                            {item}
                        </div>
                    ))
                )}
            </div>
        </div>
    );
});

const HotListItems = memo(({ hotList, onItemClick }) => {
    return (
        <div className={styles.hotSection}>
            <h2>热门推荐</h2>
            <div className={styles.hotGrid}>
                {hotList.map((item, index) => (
                    <div 
                        key={item.id} 
                        className={styles.hotItem}
                        onClick={() => onItemClick(item.name)}
                    >
                        <span className={styles.hotRank}>{index + 1}</span>
                        <span className={styles.hotName}>{item.name}</span>
                        <span className={styles.hotCount}>{item.hot}</span>
                    </div>
                ))}
            </div>
        </div>
    );
});

const SuggestList = memo(({ suggestList, onItemClick, isLoading }) => {
    if (isLoading) {
        return (
            <div className={styles.loadingState}>搜索中...</div>
        );
    }

    if (suggestList.length === 0) {
        return (
            <div className={styles.loadingState}>暂无搜索建议</div>
        );
    }

    return (
        <>
            {suggestList.map((item, index) => (
                <div 
                    key={index} 
                    className={styles.suggestItem}
                    onClick={() => onItemClick(item)}
                >
                    <SearchIcon className={styles.suggestIcon} />
                    {item}
                </div>
            ))}
        </>
    );
});

const Search = () => {
    const [query, setQuery] = useState("");
    const [searchBoxValue, setSearchBoxValue] = useState(""); // 控制搜索框的值
    const {
        hotList,
        searchHistory,
        setHotList,
        suggestList,
        setSuggestList,
        addSearchHistory,
        clearSearchHistory,
        removeSearchHistory,
        isLoading,
        error
    } = useSearchStore();

    useEffect(() => {
        setHotList();
    }, [setHotList]);

    const handleQuery = useCallback((query) => {
        setQuery(query);
        if (!query.trim()) {
            // 当搜索框为空时，清除搜索建议
            setSuggestList('');
            return;
        }
        setSuggestList(query);
    }, [setSuggestList]);

    // 处理搜索框输入值变化
    const handleSearchBoxInputChange = useCallback((value) => {
        setSearchBoxValue(value);
    }, []);

    const handleItemClick = useCallback((itemName) => {
        // 添加到搜索历史
        addSearchHistory(itemName);
        // 自动填充搜索框并搜索
        setSearchBoxValue(itemName);
        setQuery(itemName);
        handleSearch(itemName);
    }, [addSearchHistory]);

    const handleSearch = useCallback((searchTerm) => {
        if (searchTerm.trim()) {
            addSearchHistory(searchTerm);
            // 这里可以跳转到搜索结果页面
            // navigate(`/search-result?q=${encodeURIComponent(searchTerm)}`);
        }
    }, [addSearchHistory]);

    const handleHistoryClick = useCallback((historyItem) => {
        // 自动填充搜索框并搜索
        setSearchBoxValue(historyItem);
        setQuery(historyItem);
        handleSearch(historyItem);
    }, [handleSearch]);

    const handleRemoveHistory = useCallback((historyItem) => {
        removeSearchHistory(historyItem);
    }, [removeSearchHistory]);

    return (
        <div className={styles.container}>
            <SearchBox 
                handleQuery={handleQuery} 
                onSearch={handleSearch}
                onInputChange={handleSearchBoxInputChange}
                value={searchBoxValue} // 传递搜索框的值
            />
            <div className={styles.wrapper}>
                {/* 搜索建议 - 使用CSS类控制显示/隐藏 */}
                <div className={`${styles.list} ${(query && suggestList.length > 0) ? '' : styles.hidden}`}>
                    <SuggestList 
                        suggestList={suggestList} 
                        onItemClick={handleItemClick}
                        isLoading={isLoading}
                    />
                </div>
                
                {/* 加载状态 - 使用CSS类控制显示/隐藏 */}
                <div className={`${styles.list} ${(query && isLoading) ? '' : styles.hidden}`}>
                    <div className={styles.loadingState}>搜索中...</div>
                </div>
                
                {/* 历史记录和热门推荐 - 使用CSS类控制显示/隐藏 */}
                <div className={(!query || (query && suggestList.length === 0 && !isLoading)) ? '' : styles.hidden}>
                    <HistorySection 
                        history={searchHistory}
                        onHistoryClick={handleHistoryClick}
                        onClearHistory={clearSearchHistory}
                        onRemoveHistory={handleRemoveHistory}
                    />
                    <HotListItems 
                        hotList={hotList} 
                        onItemClick={handleItemClick} 
                    />
                </div>
                
                {/* 错误状态 - 使用CSS类控制显示/隐藏 */}
                <div className={`${styles.emptyState} ${error ? '' : styles.hidden}`}>
                    搜索出错: {error}
                </div>
            </div>
        </div>
    );
};

export default Search;