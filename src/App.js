import { useState, useEffect } from "react";
import UserInput from "./components/UserInput";
import Item from "./components/Item"
import StatusShow from "./components/StatusShow";
import Heading from "./components/Heading";

import "./style/main.css"

const App = () => {

  const [status,setStatus] = useState("User not picked");
  const [randomNum,setRandomNum] = useState(0);
  const [anime,setAnime] = useState({});
  const [data,setData] = useState([]);
  const [score,setScore] = useState("---");

  const GetData = async (url,category) => {
      setStatus("Loading...")

      const response = await fetch(url);
      const parsed = await response.json();

      if(parsed.status >= 300 || parsed.status <= 500 ) {
          setData([])
          setStatus("User Not Found");
      } else {
        let filtered;
        if(category === 7) {
          filtered = parsed.data;
        } else  {
          filtered = parsed.data.filter(item => item["watching_status"] === category)
        }
        setData(filtered);
        let temp_randomNum = Math.floor(Math.random()*filtered.length);
        setRandomNum(temp_randomNum); 
        if(filtered.length !== 0) {
          setStatus("User Found");
          GetScore(`https://api.jikan.moe/v4/anime/${filtered[temp_randomNum].anime.mal_id}`)
        }else 
          setStatus("User's list is Empty");
      }
  }

  const GetScore = async (url) => {
    const response = await fetch(url);
    const parsed = await response.json();
    
    
    setScore(parsed.data.score)
  }

  useEffect(()=> {
    if(data.length && randomNum && score) {
      setAnime({  name: data[randomNum].anime.title,
                  url: data[randomNum].anime.url,
                  episodes: !data[randomNum].anime.episodes ? data[randomNum].anime.status : data[randomNum].anime.episodes,
                  type: data[randomNum].anime.type,
                  imageUrl: data[randomNum].anime.images.jpg.image_url
                })
    };
  },[data,randomNum,score])


  return (
    <div className="container">
      <Heading />
      {data.length !== 0 ? 
      <Item 
      name={anime.name} 
      id={anime.mal_id}
      url={anime.url}
      episodes={anime.episodes} 
      type={anime.type} 
      imageUrl={anime.imageUrl}
      score={score}
      /> 
      : <StatusShow status={status}/> }
      <UserInput GetData={GetData}/>
    </div>
  );
}




export default App;
