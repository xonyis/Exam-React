import { createContext, useState, useEffect } from 'react';
import {jwtDecode} from 'jwt-decode';
export const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null); // Initialisez l'utilisateur comme null

    useEffect(() => {
        const token = localStorage.getItem('authToken');
        if (token) {
            try {
                const decodedToken = jwtDecode(token);
                const user = {
                    id: decodedToken.id,
                    type: decodedToken.type,
                };
                setUser(user);
            } catch (error) {
                console.error('Invalid token:', error);
                localStorage.removeItem('authToken');
            }
        }
    }, []);
    return (
        <UserContext.Provider value={{ user, setUser }}>
            {children}
        </UserContext.Provider>
    );
};