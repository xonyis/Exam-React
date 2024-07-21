// src/pages/Home.js
import {useState, useEffect} from "react";
import { useParams, useNavigate } from 'react-router-dom';
import axios from '../axiosConfig';
const EditConference = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [conference, setConference] = useState({
        id: '',
        title: '',
        date: '',
        createdAt: '',
        description: '',
        img: '',
        content: '',
        speakers: [{ firstname: '', lastname: '' }],
        stakeholders: [{ firstname: '', lastname: '' }],
        design: {
            mainColor: '',
            secondColor: '',
        },
    });

    useEffect(() => {

            axios.get(`/conference/${id}`)
                .then((response) => {
                    setConference(response.data);
                    console.log(response.data)
                })
                .catch((error) => {
                    console.error('There was an error fetching the conference!', error);
                });
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setConference((prevConference) => ({
            ...prevConference,
            [name]: value,
        }));
    };

    const handleNestedChange = (e, nestedField) => {
        const { name, value } = e.target;
        setConference((prevConference) => ({
            ...prevConference,
            [nestedField]: {
                ...prevConference[nestedField],
                [name]: value,
            },
        }));
    };

    const handleNestedArrayChange = (index, e, arrayName) => {
        const { name, value } = e.target;
        setConference((prevConference) => {
            const updatedArray = [...prevConference[arrayName]];
            updatedArray[index] = { ...updatedArray[index], [name]: value };
            return { ...prevConference, [arrayName]: updatedArray };
        });
    };


    const handleSubmit = (e) => {
        e.preventDefault();
        axios.patch(`/conference/${id}`, conference)
            .then((response) => {
                console.log('Conference updated:', response.data);
                navigate('/adminconference');
            })
            .catch((error) => {
                console.error('There was an error updating the conference!', error);
            });
    };

    return (
        <form onSubmit={handleSubmit}>
            <h1>Edit Conference</h1>
            <input type="text" name="title" value={conference.title} onChange={handleChange} placeholder="Title"
                   required/>
            <input type="text" name="date" value={conference.date} onChange={handleChange} placeholder="Date" required/>
            <input type="text" name="createdAt" value={conference.createdAt} onChange={handleChange}
                   placeholder="Created At" required/>
            <input type="text" name="description" value={conference.description} onChange={handleChange}
                   placeholder="Description" required/>
            <input type="text" name="img" value={conference.img} onChange={handleChange} placeholder="Image" required/>
            <input type="text" name="content" value={conference.content} onChange={handleChange} placeholder="Content"
                   required/>

            <h3>Speakers</h3>
            {conference.speakers.map((speaker, index) => (
                <div key={index}>
                    <input
                        type="text"
                        name="firstname"
                        value={speaker.firstname}
                        onChange={(e) => handleNestedArrayChange(index, e, 'speakers')}
                        placeholder="First Name"
                        required
                    />
                    <input
                        type="text"
                        name="lastname"
                        value={speaker.lastname}
                        onChange={(e) => handleNestedArrayChange(index, e, 'speakers')}
                        placeholder="Last Name"
                        required
                    />
                </div>
            ))}

            <h3>Stakeholders</h3>
            {conference.stakeholders.map((stakeholder, index) => (
                <div key={index}>
                    <input
                        type="text"
                        name="firstname"
                        value={stakeholder.firstname}
                        onChange={(e) => handleNestedArrayChange(index, e, 'stakeholders')}
                        placeholder="First Name"
                        required
                    />
                    <input
                        type="text"
                        name="lastname"
                        value={stakeholder.lastname}
                        onChange={(e) => handleNestedArrayChange(index, e, 'stakeholders')}
                        placeholder="Last Name"
                        required
                    />
                </div>
            ))}

            <h3>Design</h3>
            <input
                type="color"
                name="mainColor"
                value={conference.design.mainColor}
                onChange={(e) => handleNestedChange(e, 'design')}
                placeholder="Main Color"
                required
            />
            <input
                type="color"
                name="secondColor"
                value={conference.design.secondColor}
                onChange={(e) => handleNestedChange(e, 'design')}
                placeholder="Second Color"
                required
            />

            <button type="submit">Update Conference</button>
        </form>
    );
};

export default EditConference;
