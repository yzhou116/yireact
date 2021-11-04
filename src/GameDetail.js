import { React, useEffect, useState } from "react";
import { useLocation, useHistory } from "react-router-dom";
import ReactPlayer from 'react-player'
// import YouTube from 'react-youtube';
import YiComponet from './YiComponet' 



export default function GameDetail(params) {
    const history = useHistory()
    const location = useLocation();
    const [gameDetail, setgameDetail] = useState({});

    const [loading, setLoading] = useState(true);
    var id = "";

    useEffect(() => {
        console.log(location.pathname);
        console.log(location.search);
        var temp = location.search
        console.log(temp)
        console.log(typeof temp)
        if (temp.length == 5) {

            id = temp.substring(temp.length - 1)
            console.log('this is id' + id)
        } else {

            id = temp.substring(temp.length - 2)
            console.log('this is id' + id)
        }

     //  fetch("http://localhost:5000/detail/" + id).then(res => res.json()).then(gameDetail => {

        fetch("https://yinodes.herokuapp.com/detail/" + id).then(res => res.json()).then(gameDetail => {    
            if(Object.keys(gameDetail).length !== 0 ){
                console.log(gameDetail)
                setgameDetail(gameDetail);
                setLoading(false);
               
            }
        
           
   
          
           
          
             
           
        })
      
    }, [location]);


    function goBack() {
        history.goBack()
    }
    if(!loading){
        console.log(gameDetail)
        return (


            <div className="shadow p-3 mb-5 bg-body rounded" style={{
                    marginTop: 50,
                    marginLeft: 100,
                    height: 500,
                    width: 1200,
    
                }}>
                   <YiComponet value={gameDetail.link} /> 
    
                    <div className="text-center" style={{
                     marginTop: -450,
                        marginLeft: 650,
                        width: 600,
                        height: 500
    
                    }} >
                        <h5 className="card-title">Name of Game: {gameDetail.name}</h5>
                        <p className="card-text">Game Type: {gameDetail.gameType}</p>
                        <p className="card-text">Game Price: {gameDetail.price}</p>
                        <p className="card-text"># in Stockt: {gameDetail.stock}</p>
                        <button type="button" className="btn btn-primary" onClick={(e) => goBack(e)}>Go Back</button>
                    </div>   
             </div>
            )
      }else{
          return null
      }
    } 

