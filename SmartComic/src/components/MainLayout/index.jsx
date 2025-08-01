import {
    useState,
    useEffect
} from 'react';
import {
    Tabbar,
} from 'react-vant';
import {
    HomeO,
    FriendsO,
    UserO,
    BarChartO,
    Records
} from '@react-vant/icons';
import {
    Outlet,
    useNavigate,
    useLocation
} from 'react-router-dom'
import LottieAnimation from '@/components/Lottie/LottieAnimation';

//菜单栏配置
const tabs = [
    { icon: <HomeO />, title: '首页', path: '/home'},
    { icon: <Records  />, title: '排期表', path: '/schedule'},
    { icon: <LottieAnimation path="/lottie/ai-animation.json" width={80} height={80} />, title: '动漫精灵', path: '/anigenie'},
    { icon: <BarChartO  />, title: '排行榜', path: '/rankings'},
    { icon: <UserO />, title: '我的', path: '/profile'}
]

const MainLayout = () => {
    const [active, setActive] = useState(0);
    const navigate = useNavigate();
    const location = useLocation();
    useEffect(() => {
        // es6的使用power 
        const index = tabs.findIndex(
            tab => location.pathname.startsWith(tab.path)
        );
        setActive(index)
    }, [])
    return (
        <div 
            className="flex flex-col h-screen"
            style={{paddingBottom: '50px'}}
        >
            <div className="flex-1">
                <Outlet />
            </div>
            {/* tabbar */}
            <Tabbar 
                value={active} 
                onChange={
                    (key) => { 
                        setActive(key);
                        navigate(tabs[key].path);
                }
                }
                style={{
                    backgroundColor: 'skyblue',
                    borderTop: '1px solid red'
                }}
            >
                {tabs.map((tab, index) => (
                    <Tabbar.Item 
                        key={index} 
                        icon={tab.icon}
                    > 
                    {tab.title}
                    </Tabbar.Item>
                ))}
            </Tabbar>
        </div>
    )
}

export default MainLayout;