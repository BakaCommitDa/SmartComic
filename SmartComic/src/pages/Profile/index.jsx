import useTitle from '@/hooks/useTitle'
import {
    useState
} from 'react';
import {
    Image,
    Cell,
    CellGroup,
    ActionSheet
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
    Down
} from '@react-vant/icons'
import styles from './profile.module.css'
import {
    generateAvatar
} from '@/llm';

const Profile = () => {
    const [userInfo, setUserInfo] = useState({
        nickname: '神奇妙脆角',
        level: '5级',
        slogan: '不要看我',
        avatar: 'https://fastly.jsdelivr.net/npm/@vant/assets/cat.jpeg'
    })
    useTitle("我的")
    const [showActionSheet, setShowActionSheet] = useState(false);
    const handleAction = async (e) => {
        console.log(e)
        if (e.type === 1) {
        // AI 生成头像
            const text = `
                昵称: ${userInfo.nickname}
                slogan: ${userInfo.slogan}
            `;
            const newAvatar = await generateAvatar(text);
        } else if (e.type === 2) {
        // 图片上传
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
            
            {/* 功能选项 */}
            <div className={styles.functionGrid}>
                <div className={styles.functionItem}>
                    <div className={styles.functionIcon}>
                        <LikeO  />
                    </div>
                    <div className={styles.functionText}>我的收藏</div>
                </div>
                <div className={styles.functionItem}>
                    <div className={styles.functionIcon}>
                        <UnderwayO  />
                    </div>
                    <div className={styles.functionText}>历史记录</div>
                </div>
                <div className={styles.functionItem}>
                    <div className={styles.functionIcon}>
                        <Down  />
                    </div>
                    <div className={styles.functionText}>离线缓存</div>
                </div>
                <div className={styles.functionItem}>
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