import useTitle from '@/hooks/useTitle'
import React, {
    useState
} from 'react';
import {
    Image,
    Cell,
    CellGroup,
    ActionSheet,
    Button
} from 'react-vant'
import {
    CommentO,
    ShareO,
    WarningO,
    HomeO,
    SettingO,
    UnderwayO,
    LikeO,
    EnvelopO,
    Down,
    Close
} from '@react-vant/icons'
import styles from './profile.module.css'
import { useUserStore } from '../../store/userStore'
import { useNavigate } from 'react-router-dom'

const Profile = () => {
    const navigate = useNavigate()
    const { user, logout, isLogin } = useUserStore()
    
    const [userInfo, setUserInfo] = useState({
        nickname: '神奇妙脆角',
        level: '5级',
        slogan: '不要看我',
        avatar: '/src/assets/abd5096d55575b2bdb71d0cbd96e8976.jpg'
    })

    // 当用户信息更新时，同步更新本地状态
    React.useEffect(() => {
        if (user?.username) {
            setUserInfo(prev => ({
                ...prev,
                nickname: user.username
            }))
        }
    }, [user])
    
    useTitle("我的")
    const [showActionSheet, setShowActionSheet] = useState(false);
    const handleAction = async (e) => {
        // console.log(e)
        if (e.type === 1) {
        // AI 生成头像
            // TODO: 实现AI生成头像功能
            console.log('AI生成头像功能待实现');
        } else if (e.type === 2) {
        // 图片上传
            // TODO: 实现图片上传功能
            console.log('图片上传功能待实现');
        }
    }
    const actions = [
        {
            name: 'AI生成头像',
            color: '#123123',
            type: 1
        },
        {
            name: '上传头像',
            color: '#ee0a24',
            type: 2
        }

    ]
    return (
        <div className={styles.container}>
            {isLogin ? (
                // 登录状态
                <div className={styles.user}>
                    <div className={styles.avatarContainer}>
                        <Image 
                            round
                            width= "48px"
                            height="48px"
                            src={userInfo.avatar}
                            style={{cursor: 'pointer'}}
                            onClick={() => setShowActionSheet(true)}
                        />
                    </div>
                    <div className={styles.userInfo}>
                        <div className={styles.nickname}>昵称：{userInfo.nickname}</div>
                        <div className={styles.level}>等级：{userInfo.level}</div>
                        <div className={styles.slogan}>签名：{userInfo.slogan}</div>
                    </div>
                    <div className={styles.arrow}>
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M9 6L15 12L9 18" stroke="#999" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                    </div>
                </div>
            ) : (
                // 未登录状态
                <div className={styles.user} onClick={() => navigate('/login')}>
                    <div className={styles.avatarContainer}>
                        <Image 
                            round
                            width="48px"
                            height="48px"
                            src="/src/assets/image.png"
                            style={{cursor: 'pointer'}}
                        />
                    </div>
                    <div className={styles.userInfo}>
                        <div className={styles.loginTitle}>登录/注册</div>
                        <div className={styles.loginSubtitle}>不可以哦,主人还没有登录呢~</div>
                    </div>
                    <div className={styles.arrow}>
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M9 6L15 12L9 18" stroke="#999" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                    </div>
                </div>
            )}
            
            {/* 功能选项 */}
            <div className={styles.functionGrid}>
                <div className={`${styles.functionItem} ${!isLogin ? styles.disabled : ''}`} onClick={!isLogin ? () => navigate('/login') : undefined}>
                    <div className={styles.functionIcon}>
                        <LikeO  />
                    </div>
                    <div className={styles.functionText}>我的收藏</div>
                </div>
                <div className={`${styles.functionItem} ${!isLogin ? styles.disabled : ''}`} onClick={!isLogin ? () => navigate('/login') : undefined}>
                    <div className={styles.functionIcon}>
                        <UnderwayO  />
                    </div>
                    <div className={styles.functionText}>历史记录</div>
                </div>
                <div className={`${styles.functionItem} ${!isLogin ? styles.disabled : ''}`} onClick={!isLogin ? () => navigate('/login') : undefined}>
                    <div className={styles.functionIcon}>
                        <Down  />
                    </div>
                    <div className={styles.functionText}>离线缓存</div>
                </div>
                <div className={`${styles.functionItem} ${!isLogin ? styles.disabled : ''}`} onClick={!isLogin ? () => navigate('/login') : undefined}>
                    <div className={styles.functionIcon}>
                        <EnvelopO  />
                    </div>
                    <div className={styles.functionText}>我的消息</div>
                </div>
            </div>
            
            <div className="mt3">
                <CellGroup inset>
                    <Cell title="建议反馈" icon={<CommentO />} isLink />
                    <Cell title="分享应用" icon={<ShareO />} isLink />
                </CellGroup>
                <div className={styles.menuSpacing}></div>
                <CellGroup inset>
                    <Cell title="免责声明" icon={<WarningO />} isLink />
                    <Cell title="检测更新" icon={<HomeO />} isLink />
                    <Cell title="数据恢复" icon={<Down />} isLink />
                </CellGroup>
                <div className={styles.menuSpacing}></div>
                <CellGroup inset>
                <Cell title="设置" icon={<SettingO />} isLink />
                </CellGroup>
                {isLogin && (
                    <>
                        <div className={styles.menuSpacing}></div>
                        <CellGroup inset>
                            <Cell 
                                title="退出登录" 
                                icon={<Close />} 
                                onClick={() => {
                                    logout()
                                }}
                                style={{ color: '#ee0a24' }}
                            />
                        </CellGroup>
                    </>
                )}
            </div>
            <ActionSheet
                visible={showActionSheet}
                actions={actions}
                cancelText='取消'
                onCancel={() => setShowActionSheet(false)}
                onSelect={(e) => handleAction(e)}
            >

            </ActionSheet>
        </div>
    )
}

export default Profile