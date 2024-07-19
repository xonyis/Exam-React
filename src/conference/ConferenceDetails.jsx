import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import axios from "../axiosConfig";


const ConferenceDetails = () => {
    const { id } = useParams();
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

    const containerStyle = {
        backgroundColor: conference.design.mainColor,
        padding: '20px',
        borderRadius: '8px',
    };

    const inputStyle = {
        color: conference.design.secondColor,
        backgroundColor: 'hsla(0, 0%, 0%, 0)',

    }
    return (
        <form className={'m-auto col-10'} style={containerStyle}>
            <h1>Visualiser Conference</h1>
            <label style={inputStyle}  htmlFor="title">Title</label>
            <input style={inputStyle} type="text" name="title" value={conference.title} placeholder="Title" disabled
                   required/> <br/>
            <label style={inputStyle} htmlFor="date">Date</label>

            <input style={inputStyle} type="text" name="date" value={conference.date} placeholder="Date" required disabled/><br/>
            <label style={inputStyle} htmlFor="createdAt">Created At</label>
            <input style={inputStyle} type="text" name="createdAt" value={conference.createdAt} disabled
                   placeholder="Created At" required/><br/>
            <label style={inputStyle} htmlFor="description">Description</label>
            <input style={inputStyle} type="text" name="description" value={conference.description} disabled
                   placeholder="Description" required/><br/>
            <label style={inputStyle} htmlFor="img">Image</label>
            <input style={inputStyle} type="text" name="img" value={conference.img} placeholder="Image" required disabled/><br/>
            <label style={inputStyle} htmlFor="content">Content</label>
            <input style={inputStyle} type="text" name="content" value={conference.content} placeholder="Content" disabled
                   required/><br/>

            <h3>Speakers</h3>
            {conference.speakers.map((speaker, index) => (
                <div key={index}>
                    <label style={inputStyle} htmlFor={`speaker-firstname-${index}`}>First Name</label>

                    <input
                        style={inputStyle}
                        type="text"
                        name="firstname"
                        value={speaker.firstname}
                        placeholder="First Name"
                        required
                        disabled
                    /><br/>
                    <label style={inputStyle} htmlFor={`speaker-lastname-${index}`}>Last Name</label>

                    <input
                        style={inputStyle}
                        type="text"
                        name="lastname"
                        value={speaker.lastname}
                        placeholder="Last Name"
                        required
                        disabled
                    /><br/>
                </div>
            ))}

            <h3>Stakeholders</h3>
            {conference.stakeholders.map((stakeholder, index) => (
                <div key={index}>
                    <label style={inputStyle} htmlFor={`stakeholder-firstname-${index}`}>First Name</label>

                    <input
                        style={inputStyle}
                        type="text"
                        name="firstname"
                        value={stakeholder.firstname}
                        placeholder="First Name"
                        required
                        disabled
                    />
                    <label style={inputStyle} htmlFor={`stakeholder-lastname-${index}`}>Last Name</label>

                    <input
                        style={inputStyle}
                        type="text"
                        name="lastname"
                        value={stakeholder.lastname}
                        placeholder="Last Name"
                        required
                        disabled
                    />
                </div>
            ))}

            <h3>Design</h3>
            <label style={inputStyle} htmlFor="mainColor">Main Color</label>

            <input
                style={inputStyle}
                type="text"
                name="mainColor"
                value={conference.design.mainColor}
                placeholder="Main Color"
                required
                disabled
            />
            <label style={inputStyle} htmlFor="secondColor">Second Color</label>

            <input
                style={inputStyle}
                type="text"
                name="secondColor"
                value={conference.design.secondColor}
                placeholder="Second Color"
                required
                disabled
            />

        </form>
    )
}
export default ConferenceDetails;