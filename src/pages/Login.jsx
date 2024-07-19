import axios from 'axios';
import {useContext, useState} from "react";
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import {UserContext} from "../context/UserContext";


const Login = () => {
    const [id, setId] = useState("");
    const [password, setPassword] = useState("");
    const { setUser } = useContext(UserContext);
    const { login } = useContext(UserContext);
    const navigate = useNavigate();

    const handleLogin = () => {
        axios.post('http://localhost:4555/login', { id, password }).then((response) => {
            const token = response.data;
            localStorage.setItem('authToken', token);
            const decodedToken = jwtDecode(token);
            console.log(decodedToken)
            const user = {
                id: decodedToken._id,
                type: decodedToken.type,
            };
            login(user);
            // localStorage.setItem('user', JSON.stringify(user));
            console.log('User:', user);

            navigate('/conference');

        });
    };

    const handleSignup = () => {
        axios.post('http://localhost:4555/signup', { id, password }).then((response) => {
            console.log(response.data);
        });
    };

    const styleForm = {
        width: "40%",
        margin: "auto",
        display: 'flex',
        flexDirection: 'column',
        gap: "20px",
    }
    return (
        <div style={styleForm}>
            <h1>Login</h1>
            <input type="text" value={id} onChange={(e) => setId(e.target.value)} placeholder="Username"/>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)}
                   placeholder="Password"/>
            <button onClick={handleLogin}>Login</button>
            <button onClick={handleSignup}>Signup</button>

        </div>
    );
}

export default Login;