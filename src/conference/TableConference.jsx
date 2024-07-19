
import {useState, useEffect, useContext} from 'react';
import axios from 'axios';
import { Table, Button } from 'react-bootstrap';
import { UserContext } from '../context/UserContext';
import {Link, useNavigate} from "react-router-dom";


const Conference = () => {
    const [conferences, setConferences] = useState([]);
    const { user } = useContext(UserContext);
    const navigate = useNavigate();

    useEffect(() => {
        axios.get('http://localhost:4555/conferences')
            .then((response) => {
                setConferences(response.data);
                console.log(response.data)
            })
            .catch((error) => {
                console.log(error)
            });
    }, []);

    const handleEdit = (id) => {
        // Implémentez votre logique de modification ici
        console.log(`Edit conference with id: ${id}`);
        axios.get(`http://localhost:4555/conference/${id}`)
            .then((response) => {
                const conference = response.data;
                console.log(response.data)

                navigate(`/conferencedetails/${id}`, { state: { conference } });
            })
            .catch((error) => {
                console.log(error)
            });
    };

    const handleDelete = (id) => {
        // Implémentez votre logique de suppression ici
        console.log(`Delete conference with id: ${id}`);
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
                    <th></th>
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
                        <td>
                            <Button variant="primary" onClick={() => handleEdit(conference.id)} >Voir les details</Button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </Table>
        </div>
    );
};

export default Conference;
