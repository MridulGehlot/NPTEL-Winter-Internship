import Profile from './pages/Profile';
import Courses from './pages/Courses';
import Dashboard from './pages/Dashboard';
import {Routes,Route} from 'react-router-dom';
import { lazy,Suspense } from 'react';

function App() {
  const Dashboard=lazy(()=>import('./pages/Dashboard'));
  const Profile=lazy(()=>import('./pages/Profile'));
  const Courses=lazy(()=>import('./pages/Courses'));
  return (
    <>
    <Suspense fallback={<div>Loading...</div>}>
    <div>
      <Routes>
        <Route path='/' element={<Dashboard studentName="Amit"/>}/>
        <Route path='/profile' element={<Profile/>}/>
        <Route path='/courses' element={<Courses/>}/>
      </Routes>
    </div>
    </Suspense>
    </>
  )
}

export default App;
