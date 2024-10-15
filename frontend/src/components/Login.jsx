import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Login = () => {
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await fetch('http://localhost:3000/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ name, password }),
            });
            const data = await res.json();
            if (res.ok) {
                localStorage.setItem('userId', data.id);
                localStorage.setItem('name', data.name);
                alert(data.message);
                navigate('/home'); // Redirect to home page after successful login
            } else {
                // Handle errors, such as incorrect credentials
                alert(data.message || "Login failed");
            }
        } catch (error) {
            console.error("Login error:", error);
            alert("An error occurred. Please try again.");
        }
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Name</label>
                    <input type="text" placeholder="name" value={name} onChange={(e) => setName(e.target.value)} />
                </div>
                <div>
                    <label>Password</label>
                    <input type="password" placeholder="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                </div>
                <button type="submit">Login</button>
            </form>
            <p>
                Dont have an account? <Link to="/signup">Signup</Link>
            </p>
        </div>
    );
}

export default Login;
