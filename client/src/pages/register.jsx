import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardHeader, CardFooter, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import API from '../services/api';
import { Link } from 'react-router-dom';

export default function Signup(){

    const [ name, setName ] = useState("");
    const [ username, setUsername ] = useState("");
    const [ email, setEmail ] = useState("");
    const [ password, setPassword ] = useState("");
    const [ loading, setLoading ] = useState(false);
    const navigate = useNavigate();

    const handleSignup = async ()=> {
        // Check if fields are provided
        if(!name || !username || !email || !password) alert('All fields required');
        setLoading(true);

        try {
            const res = await API.post('/user/register', { name, username, email, password });
            localStorage.setItem('jwtToken', res.data.token);
            navigate('/dashboard');

            if(!res.data.token) {
                alert('Signup failed: no token')
                return
            }
        } catch (error) {
            alert(error.response?.data?.message || "SignUp failed")
        } finally {
            setLoading(false)
        }
    }
    

    // Return the register/signup card
    return(
        <div>
            <Card>
                <CardHeader>
                    <CardTitle>Sign Up</CardTitle>
                </CardHeader>
                <CardContent>
                    <Input
                        type="text"
                        value={name}
                        placeholder="Firstname"
                        onChange={(e) => setName(e.target.value)}
                    />
                    <Input
                        type="text"
                        value={username}
                        placeholder="Username"
                        onChange={(e) => setUsername(e.target.value)}
                    />
                    <Input
                        type="email"
                        value={email}
                        placeholder="e-mail"
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <Input
                        type="password"
                        value={password}
                        placeholder="password"
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </CardContent>
                <CardFooter>
                    <Button onClick={handleSignup} disabled={loading}>
                        {loading ? "Signing up ..." : "Sign up"}
                    </Button>
                </CardFooter>
                <p>
                    Already have an account?{" "}
                    <Link to="/login">Log In</Link>
                </p>
            </Card>
        </div>
    )
}
