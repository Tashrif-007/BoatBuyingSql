import { useState } from 'react';
import { Link } from 'react-router-dom';

const Signup = () => {
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        const res = await fetch('http://localhost:3000/auth/signup', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name, password }),
        });
        // const data = await res.json();
        if (res.ok) {
            alert("User created successfully!");
        }
        setName('');
        setPassword('');
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
                <button type="submit">Signup</button>
            </form>
            <p>
                Already have an account? <Link to="/">Login</Link>
            </p>
        </div>
    );
}

export default Signup;
