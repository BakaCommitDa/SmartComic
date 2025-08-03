import {
    useState,
    useEffect
} from 'react';
import {
    Tabbar,
} from 'react-vant';
import {
    HomeO,
    UserO,
    BarChartO,
    Records,
    ServiceO
} from '@react-vant/icons';
import {
    Outlet,
    useNavigate,
    useLocation
} from 'react-router-dom'


//菜单栏配置
const tabs = [
    { icon: <HomeO />, title: '首页', path: '/home'},
    { icon: <Records />, title: '排期表', path: '/schedule'},
    { icon: <ServiceO />, title: '动漫精灵', path: '/anigenie'},
    { icon: <BarChartO />, title: '排行榜', path: '/rankings'},
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
        >
            <div className="flex-1">
                <Outlet />
            </div>
            {/* tabbar */}
            <Tabbar 
                value={active} 
                onChange={(key) => { 
                    setActive(key);
                    navigate(tabs[key].path);
                }}
                style={{
                    backgroundColor: '#f7f7f7',
                    borderTop: '1px solid #e5e5e5',
                    height: '50px',
                    minHeight: '50px',
                    position: 'fixed',
                    bottom: 0,
                    left: 0,
                    right: 0,
                    zIndex: 1000
                }}
                activeColor="#07c160"
                inactiveColor="#7f7f7f"
            >
                {tabs.map((tab, index) => (
                    <Tabbar.Item 
                        key={index} 
                        icon={tab.icon}
                        style={{
                            fontSize: '12px',
                            color: active === index ? '#07c160' : '#7f7f7f'
                        }}
                    > 
                    {tab.title}
                    </Tabbar.Item>
                ))}
            </Tabbar>
        </div>
    )
}

export default MainLayout;