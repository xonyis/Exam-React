import {useState} from "react";
import axios from '../axiosConfig';
import { useNavigate } from 'react-router-dom';

const CreateConferenceComponent = () => {
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

    const handleSubmit = (e) => {
        axios.post('/conference', conference)
            .then((response) => {
                console.log('Conference created:', response.data);

            })
            .catch((error) => {
                console.error('There was an error creating the conference!', error);
            });
        navigate('/adminconference');
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setConference((prevConference) => ({
            ...prevConference,
            [name]: value,
        }));
    };

    const handleArrayChange = (index, e, field) => {
        const { name, value } = e.target;
        const updatedArray = conference[field].map((item, i) => {
            if (i === index) {
                return { ...item, [name]: value };
            }
            return item;
        });
        setConference((prevConference) => ({
            ...prevConference,
            [field]: updatedArray,
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

    return (
        <form onSubmit={handleSubmit}>
            <h1>Create Conference</h1>
            <input type="text" name="id" value={conference.id} onChange={handleChange} placeholder="ID" required />
            <input type="text" name="title" value={conference.title} onChange={handleChange} placeholder="Title" required />
            <input type="date" name="date" value={conference.date} onChange={handleChange} placeholder="Date" required />
            <input type="date" name="createdAt" value={conference.createdAt} onChange={handleChange} placeholder="Created At" required />
            <input type="text" name="description" value={conference.description} onChange={handleChange} placeholder="Description" required />
            <input type="text" name="img" value={conference.img} onChange={handleChange} placeholder="Image" required />
            <input type="text" name="content" value={conference.content} onChange={handleChange} placeholder="Content" required />

            <h3>Speakers</h3>
            {conference.speakers.map((speaker, index) => (
                <div key={index}>
                    <input
                        type="text"
                        name="firstname"
                        value={speaker.firstname}
                        onChange={(e) => handleArrayChange(index, e, 'speakers')}
                        placeholder="First Name"
                        required
                    />
                    <input
                        type="text"
                        name="lastname"
                        value={speaker.lastname}
                        onChange={(e) => handleArrayChange(index, e, 'speakers')}
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
                        onChange={(e) => handleArrayChange(index, e, 'stakeholders')}
                        placeholder="First Name"
                        required
                    />
                    <input
                        type="text"
                        name="lastname"
                        value={stakeholder.lastname}
                        onChange={(e) => handleArrayChange(index, e, 'stakeholders')}
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

            <button type="submit">Create Conference</button>
        </form>
    );
};

export default CreateConferenceComponent;