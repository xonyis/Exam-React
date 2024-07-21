// src/components/Navbar.js
import React, {useContext, useEffect, useState} from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from '../context/UserContext';


const Navbar = () => {
    const { user } = useContext(UserContext);
    const [isAdmin, setIsAdmin] = useState(false);

    useEffect(() => {
        console.log('User:', user); // Debug log
        if (user && user.type === 'admin') {
            setIsAdmin(true);
        } else {
            setIsAdmin(false);
        }
    }, [user]);

    return (
        <nav className={'col-12 d-flex justify-content-center align-items-center p-2'}>
            <ul className={'list-unstyled  d-flex gap-5 align-items-center'}>
                <li><Link className={'btn btn-primary'} to="/">Home</Link></li>
                <li><Link className={'btn btn-primary'}  to="/login">Login</Link></li>
                {user && (<li><Link className={'btn btn-primary'}  to="/conference">Conférences</Link></li>)}
                {isAdmin && (
                    <>
                    <li><Link className={'btn btn-primary'}  to="/adminuser">Admin User</Link></li>
                    <li><Link className={'btn btn-primary'}  to="/adminconference">Admin Conference</Link></li>
                    </>
                )}
            </ul>
        </nav>
    );
};

export default Navbar;
