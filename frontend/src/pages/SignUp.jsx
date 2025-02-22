import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { BackendURLContext } from "../components/Navigation";

const Signup = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();
    const backendURL = useContext(BackendURLContext).backendURL;

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!username || !password || !confirmPassword) {
            setError("All fields are required");
            return;
        }
        if (password !== confirmPassword) {
            setError("Passwords do not match");
            return;
        }

        axios.post(`${backendURL}/api/signup`, {
            username: username,
            password: password,
        })
        .then((res) => {   
            console.log(res);
            console.log(res.data);
            if(res.status === 201){
                alert(`Account created for ${username}`);
                localStorage.setItem("token", res.data.token);
                navigate("/dashboard");
            }
            else{
                alert("User already exists");
            }
        })
        .catch((error) => {
            console.error(error);
        });

        setUsername("");
        setPassword("");
        setConfirmPassword(""); 
    };

    return (
        <div className="d-flex justify-content-center align-items-center min-vh-100 bg-light">
            <div className="card p-4 shadow-lg" style={{ width: '20rem' }}>
                <h2 className="text-center mb-4">Sign Up</h2>
                {error && <div className="alert alert-danger text-center">{error}</div>}
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="username" className="form-label">Username</label>
                        <input
                            type="text"
                            id="username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            className="form-control"
                            placeholder="Enter username"
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="password" className="form-label">Password</label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="form-control"
                            placeholder="Enter password"
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="confirmPassword" className="form-label">Confirm Password</label>
                        <input
                            type="password"
                            id="confirmPassword"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            className="form-control"
                            placeholder="Confirm password"
                        />
                    </div>
                    <button type="submit" className="btn btn-success w-100">
                        Sign Up
                    </button>
                </form>
            </div>
        </div>
    );
}

export default Signup;
