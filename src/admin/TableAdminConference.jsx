
import {useState, useEffect, useContext} from 'react';
import axios from '../axiosConfig';
import { Table, Button } from 'react-bootstrap';
import { UserContext } from '../context/UserContext';
import {Link, useNavigate} from "react-router-dom";

const TableAdminConference = () => {
    const [conferences, setConferences] = useState([]);
    const navigate = useNavigate();
    const { user } = useContext(UserContext);

    useEffect(() => {
        axios.get('http://localhost:4555/conferences')
            .then((response) => {
                setConferences(response.data);
            })
            .catch((error) => {
                console.log(error)
            });
    }, []);


    const handleEdit = (id) => {
        console.log(`Edit conference with id: ${id}`);
        axios.get(`http://localhost:4555/conference/${id}`)
            .then((response) => {
                const conference = response.data;
                console.log(response.data)

                navigate(`/editconference/${id}`, { state: { conference } });
            })
            .catch((error) => {
                console.log(error)
            });
    };

    const handleDelete = (id) => {
        // Implémentez votre logique de suppression ici
        console.log(`Delete conference with id: ${id}`);
        axios.delete(`http://localhost:4555/conference/${id}`)
            .then((response) => {
                console.log(response.data)
                window.location.reload();
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
                    <th>Title</th>
                    <th>Description</th>
                    <th>Location</th>
                    <th><Link to='/createconference' className={'float-end'} variant="primary">Créer une Conférence +</Link>{' '}</th>
                </tr>
                </thead>
                <tbody>
                {conferences.map((conference, index) => (
                    <tr key={conference.id}>
                        <td>{index + 1}</td>
                        <td>{conference.title}</td>
                        <td>{conference.description}</td>
                        <td>
                            {conference.speakers && conference.speakers.length > 0 ? (
                                <ul>
                                    {conference.speakers.map((speaker) => (
                                        <li className={' list-unstyled class'} key={speaker._id}>
                                            {speaker.firstname} {speaker.lastname}
                                        </li>
                                    ))}
                                </ul>
                            ) : (
                                <span>No speakers</span>
                            )}
                        </td>
                        {user && user.type === 'admin' && (
                            <td className={'d-flex justify-content-around'}>
                                <Button   variant="warning" onClick={() => handleEdit(conference.id)}>Edit</Button>{' '}
                                <Button   variant="danger" onClick={() => handleDelete(conference.id)}>Delete</Button>
                            </td>
                        )}
                    </tr>
                ))}
                </tbody>
            </Table>
        </div>
    );
};

export default TableAdminConference;
