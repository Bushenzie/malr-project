import { useState, useEffect } from "react";
import UserInput from "./components/UserInput";
import Item from "./components/Item"
import StatusShow from "./components/StatusShow";
import Heading from "./components/Heading";

import "./style/main.css"

const App = () => {

  const [status,setStatus] = useState("User not picked");
  const [anime,setAnime] = useState({});
  const [data,setData] = useState([]);

  const GetData = async (url) => {
      setStatus("Loading...")
      console.log("Loading...");

      const response = await fetch(url);
      const parsed = await response.json();
      if(parsed.status === 400 || parsed.status === 500) {
          setData([])
          setStatus("User Not Found");
          console.log("User Not Found");
      } else {
          const filtered = parsed.data.filter(item => item["watching_status"] === 6)
          setData(filtered);
          setStatus("User Found");
          if(filtered.length === 0) {
            setStatus("User's list is Empty");
          }
          console.log("User Found");
      }
  }

  useEffect(()=> {
    if(data.length) {
      let randomNum = Math.floor(Math.random()*data.length)+1; 
      setAnime({  name:data[randomNum].anime.title,
                  url: data[randomNum].anime.url,
                  episodes: !data[randomNum].anime.episodes ? data[randomNum].anime.status : data[randomNum].anime.episodes,
                  type: data[randomNum].anime.type,
                  imageUrl: data[randomNum].anime.images.jpg.image_url
                })
    };
  },[data])

  return (
    <div className="container">
      <Heading />
      {data.length !== 0 ? 
      <Item 
      name={anime.name} 
      url={anime.url}
      episodes={anime.episodes} 
      type={anime.type} 
      imageUrl={anime.imageUrl}
      /> 
      : <StatusShow status={status}/> }
      <UserInput GetData={GetData}/>
    </div>
  );
}




export default App;
