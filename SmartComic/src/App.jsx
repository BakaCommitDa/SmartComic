
import './App.css'
import {
  Suspense,
  lazy
} from 'react';
import {
  Routes,
  Route,
  Navigate
} from 'react-router-dom'
import Loding from '@/components/Loding'
import BlankLayout from '@/components/BlankLayout'
import MainLayout from '@/components/MainLayout'


const Home = lazy(() => import( '@/pages/Home'))
const Schedule = lazy(() => import( '@/pages/Schedule'))
const AniGenie = lazy(() => import( '@/pages/AniGenie'))
const Rankings = lazy(() => import( '@/pages/Rankings'))
const Profile = lazy(() => import( '@/pages/Profile'))

const Detail = lazy(() => import( '@/pages/Detail'))
const Search = lazy(() => import( '@/pages/Search'))
const Login = lazy(() => import( '@/pages/Login'))



function App() {

  return (
    <>
    <Suspense fallback={<Loding />}>
      <Routes>
        {/* 带有tabbar的Layout */}
        <Route element={<MainLayout />}>
          <Route path="/" element={<Navigate to="/home" />}/>
          <Route path="/home" element={<Home/>}/>
          <Route path="/schedule" element={<Schedule/>}/>
          <Route path="/anigenie" element={<AniGenie/>}/>
          <Route path="/rankings" element={<Rankings/>}/>
          <Route path="/profile" element={<Profile/>}/>

        </Route>

      </Routes>


      <Routes>
        {/* 空的Layout */}
        <Route element={<BlankLayout />}>
          <Route path="/login" element={<Login />}/>
          <Route path="/search" element={<Search />}/>
          <Route path="/detail/:id" element={<Detail />} />
          

        
        </Route>
        
      </Routes>


    </Suspense>
    </>
  )
}

export default App
