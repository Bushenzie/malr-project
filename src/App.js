import { useState } from "react";
import UserInput from "./components/UserInput";
import Item from "./components/Item"
import StatusShow from "./components/StatusShow";
import Heading from "./components/Heading";

import "./style/main.css"

const App = () => {

  //STATES
  const [status,setStatus] = useState("User not picked");
  const [anime,setAnime] = useState({});
  const [data,setData] = useState([]);
  const [score,setScore] = useState("---");



  // PARSING DATA FROM JIKAN API
  const GetData = async (url,category) => {

      document.body.style.cursor = "wait";
      setStatus("Loading...")
      

      const response = await fetch(url);
      const parsed = await response.json();

      // CHECKING FOR ERROR
      if(parsed.status >= 300 || parsed.status <= 500 ) {
          setData([])
          setStatus("User Not Found");
      } 
      else {

        // IF CATEGORY = 7(ALL) THEN SKIP FILTERING TO SHOW ALL ELSE FILTER BY CATEGORY
        let animeData;
        if(category === 7) {
          animeData = parsed.data;
        }
        else {
          animeData = parsed.data.filter(item => item["watching_status"] === category)
        }

        //SET DATA TO STATE
        setData(animeData);

        //PICKING RANDOM ANIME
        let randomNum = Math.floor(Math.random()*animeData.length);

        //IF SOME LIST IS NOT EMPTY THEN PICK RANDOM
        if(animeData.length) {

          setStatus("User Found");

          //GETTING SCORE FROM ANOTHER API CALL , CUZ FIRST ONE DOESNT SHOW SCORE 
          GetScore(`https://api.jikan.moe/v4/anime/${animeData[randomNum].anime.mal_id}`);
          setAnime({  name: animeData[randomNum].anime.title,
                      url: animeData[randomNum].anime.url,
                      episodes: !animeData[randomNum].anime.episodes ? animeData[randomNum].anime.status : animeData[randomNum].anime.episodes,
                      type: animeData[randomNum].anime.type,
                      imageUrl: animeData[randomNum].anime.images.jpg.image_url})
        } else { 
          setStatus("User's list is Empty");
        }
      }
      document.body.style.cursor = "default";
  }

  const GetScore = async (url) => {
    const response = await fetch(url);
    const parsed = await response.json();
    setScore(parsed.data.score);
  }

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
