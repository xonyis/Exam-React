// src/pages/Home.js
import {useState, useEffect} from "react";
import axios from 'axios';
import TableConference from "../conference/TableConference";

const Conference = () => {
    const [conferences, setConferences] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:4555/conferences')
            .then((response) => {
                setConferences(response.data);
                console.log(conferences)
            })
            .catch((error) => {
                console.log(error)
            });
    }, [])
    return (
        <div>
            <h1>Conference Page</h1>
            <p>Welcome to the Conference Page!</p>

            <TableConference/>
        </div>
    );
};

export default Conference;
