import {useState, useEffect, useContext} from 'react';
import axios from '../axiosConfig';
import { Table, Button } from 'react-bootstrap';
import { UserContext } from '../context/UserContext';
import {Link, useNavigate} from "react-router-dom";

const TableAdminUser = () => {
    const [users, setUsers] = useState([]);
    const [user, setUser] = useState({});
    useEffect(() => {
        axios.get('http://localhost:4555/users')
            .then((response) => {
                setUsers(response.data)
                console.log(users)
            })
            .catch((error) => {
                console.log(error)
            });
    }, []);

    const handleDelete = (id) => {
        // Implémentez votre logique de suppression ici
        console.log(`Delete conference with id: ${id}`);
        axios.delete(`http://localhost:4555/user/${id}`)
            .then((response) => {
                console.log(response.data)
                window.location.reload()
            })
            .catch((error) => {
                console.log(error)
            });
    };

    const handleEdit = (id) => {
        console.log(`Edit conference with id: ${id}`);
        setUser(users.find(user => user.id === id))

        axios.patch(`http://localhost:4555/usertype/${id}`,{newType: "admin"})
            .then((response) => {
                console.log(response.data)
                window.location.reload()
            })
            .catch((error) => {
                console.log(error)
            });
    };
    return (
        <div className={'col-10 m-auto'}>
        <Table striped bordered hover>
            <thead>
            <tr>
                <th>#</th>
                <th>User</th>
                <th>Role</th>
            </tr>
            </thead>
            <tbody>
            {users.map((user, index) => (
                <tr key={user.id}>
                    <td>{index + 1}</td>
                    <td>{user.id}</td>
                    <td>{user.type}</td>

                        <td className={'d-flex justify-content-around'}>
                            <Button variant="warning" onClick={() => handleEdit(user.id)}>Edit</Button>{' '}
                            <Button variant="danger" onClick={() => handleDelete(user.id)}>Delete</Button>
                        </td>

                </tr>
            ))}
            </tbody>
        </Table>
        </div>
    )
}

export default TableAdminUser;
