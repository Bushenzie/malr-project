import {useState} from "react";


const UserInput = ({GetData}) => {

    const [username,setUsername] = useState("");
    const [url,setUrl] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        GetData(url);
    }

    return (
        <form className="form" onSubmit={handleSubmit}>
            <input className="input_field" type="text" value={username} onChange={(e) => {
                setUsername(e.target.value);
                setUrl(`https://api.jikan.moe/v4/users/${e.target.value}/animelist`)
            }}
            placeholder="Your MAL Username" 
            required/>
            <button className="btn" type="submit">Give me random anime!</button>
        </form>
    )
}

export default UserInput