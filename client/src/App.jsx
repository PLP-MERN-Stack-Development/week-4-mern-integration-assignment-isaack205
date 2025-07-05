import { Route, Routes, BrowserRouter, Navigate } from 'react-router-dom'
import Login from './pages/login';
import Signup from './pages/register';
import Dashboard from './pages/dashboard'


export default function App(){

    return(
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Navigate to="/dashboard" />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Signup />} />
            </Routes>
        </BrowserRouter>
    )
}