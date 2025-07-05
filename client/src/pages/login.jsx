import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from '../services/api';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardHeader, CardFooter, CardTitle, CardContent } from '@/components/ui/card';

export default function Login(){

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleLogin= async () =>{
        // Check if fields are empty
        if(!email || !password) alert('All fields required');

        setLoading(true);
        try {
            // Send data to the endpoint backend  
            const res = await API.post('/user/login', { email, password });
            localStorage.setItem('jwtToken', res.data.token)
            navigate('/dashboard');
            // If no token
            if(!res.data.token){
                alert('Login failed: no token')
                return
            }
        } catch (error) {
            alert(error.response?.data?.token || "Login failed")
        } finally {
            setLoading(false)
        }

    }

    return(
       <div>
        <Card>
            <CardHeader>
                <CardTitle>Sign In</CardTitle>
            </CardHeader>
            <CardContent>
                <Input 
                    type="email" 
                    value={email}
                    placeholder="Email"
                    onChange={(e) => setEmail(e.target.value)}
                />
                <Input 
                    type="password"
                    value={password}
                    placeholder="Enter Password"
                    onChange={(e) => setPassword(e.target.value)}
                />
            </CardContent>
            <CardFooter>
                <Button onClick={handleLogin} disabled={loading}>
                    {loading ? "Logging in ....." : "Log In"}
                </Button>
            </CardFooter>
            <p>
                Don't have an account? {" "}
                <Link to="/register">Sign Up</Link>
            </p>
        </Card>
       </div>
    )

};
