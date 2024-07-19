// src/pages/AdminUser.js
import React from 'react';
import TableConference from "../conference/TableConference";
import TableAdminConference from "../admin/TableAdminConference";

const AdminConference = () => {
    return (
        <div>
            <h1>Admin Conference Page</h1>
            <p>Welcome, Admin!</p>
            <TableAdminConference/>
        </div>
    );
};

export default AdminConference;
