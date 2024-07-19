// src/components/Navbar.js
import React, {useContext} from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from '../context/UserContext';


const Navbar = () => {
    const { user } = useContext(UserContext);

    return (
        <nav>
            <ul>
                <li><Link to="/">Home</Link></li>
                <li><Link to="/login">Login</Link></li>
                {user && (<li><Link to="/conference">Conférences</Link></li>)}
                {user && user.type === 'admin' && (
                    <li><Link to="/adminuser">Admin User</Link></li>

                )}
                {user && user.type === 'admin' && (
                    <li><Link to="/adminconference">Admin Conference</Link></li>

                )}
            </ul>
        </nav>
    );
};

export default Navbar;
