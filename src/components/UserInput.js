import {useState} from "react";


const UserInput = ({GetData}) => {

    const [username,setUsername] = useState("");
    const [category,setCategory] = useState(7);
    const [url,setUrl] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        GetData(url,category)
    }

    return (
        <form className="form" onSubmit={handleSubmit}>
            <div className="inputs">
                <input className="input_field" type="text" value={username} onChange={(e) => {
                    setUsername(e.target.value);
                    setUrl(`https://api.jikan.moe/v4/users/${e.target.value}/animelist`)
                }}
                placeholder="Your MAL Username" 
                required/>
                <select className="input_select" onChange={(e) => {setCategory(parseInt(e.target.value))}} required>
                    <option value="7">All</option>
                    <option value="1">Watching</option>
                    <option value="2">Completed</option>
                    <option value="3">On Hold</option>
                    <option value="4">Dropped</option>
                    <option value="6">Plan To Watch</option>
                </select>
            </div>
            <button className="btn" type="submit">Give me random anime!</button>
        </form>
    )
}

export default UserInput