import { useState, useEffect } from 'react';
import { ListGroup } from 'react-bootstrap';
import { useHistory,useParams } from "react-router-dom";
import {  Link } from 'react-router-dom';
import GameDetail from './GameDetail'


export default function MyGames() {

    const [games, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const history = useHistory();

    useEffect(() => {
        setLoading(true);
        
 //      fetch("http://localhost:5000/result").then(res => res.json()).then(games => {
        fetch("https://yinodes.herokuapp.com/result").then(res => res.json()).then(games => {
            setLoading(false);
            setProducts(games);
        })
    }, []);
    // debugger;
    function checkRating(game) {

        var rate = 0;
        if (game.YiRating.length == 5) {
            rate = parseFloat(game.YiRating.substring(game.YiRating.length - 2));
        } else if (game.YiRating.length == 4) {
            rate = parseFloat(game.YiRating.substring(game.YiRating.length - 1));
        }
        else {
            rate = parseFloat(game.YiRating.substring(game.YiRating.length - 3));
        }


        if (rate == 10) {

            return <tr style={{
                color: "green"
            }
            } key={game.id}>
                <th scope="row">{game.id}</th>
                <td>{game.name}</td>
                <td>{game.year}</td>
                <td>{game.system}</td>
                <td>{game.YiRating}</td>
          <td>
      
         <button type="button" className="btn btn-primary" onClick={(e)=>productDetail(game.id,e)}>View Details</button> 
          </td>
            
        
              
                
            </tr>
        } else if (rate >= 9 && rate < 10) {
            return <tr style={{
                color: "greenyellow"
            }
            } key={game.id}>
                <th scope="row">{game.id}</th>
                <td>{game.name}</td>
                <td>{game.year}</td>
                <td>{game.system}</td>
                <td>{game.YiRating}</td>
          <td>
  
        <button type="button" className="btn btn-primary" onClick={(e)=>productDetail(game.id,e)}>View Details</button> 
          </td>
         
       
            </tr>
        } else if (rate == 8.7){
            return <tr style={{
                color: "Gold"
            }
            } key={game.id}>
                <th scope="row">{game.id}</th>
                <td>{game.name}</td>
                <td>{game.year}</td>
                <td>{game.system}</td>
                <td>{game.YiRating}</td>
            <td>
          
           <button type="button" className="btn btn-primary" onClick={(e)=>productDetail(game.id,e)}>View Details</button> 
            </td>
            
             
            </tr>
        }
        else {
           
            return <tr style={{
                color: "red"
            }
            } key={game.id}>
                <th scope="row">{game.id}</th>
                <td>{game.name}</td>
                <td>{game.year}</td>
                <td>{game.system}</td>
                <td>{game.YiRating}</td>
            <td>
   
           <button type="button" className="btn btn-primary" onClick={(e)=>productDetail(game.id,e)}>View Details</button> 
            </td>
          
             
            </tr>
        }


    }
    function productDetail(id,e){
        let url = '/details';
        
        history.push({
            pathname : url,
            search: '?id=' + id
        })
   
        console.log('abc')
        console.log(id)
       

    }

    if (!loading) {
        return (
            <>
                <h3 style={{
                    marginTop: 30
                }
                }>WEB422 Assignment</h3>
                <br />
                <div style={{
                    height: 600,
                    overflow: 'scroll'
                }
                } >
                    <table className="table"

                    >
                        <thead >
                            <tr key='titleoftable'>
                                <th scope="col">ID</th>
                                <th scope="col">Game Name</th>
                                <th scope="col">Year of Game</th>
                                <th scope="col">System</th>
                                <th scope="col">My Rating</th>
                                <th scope="col">View Game Detail</th>
                            </tr>
                        </thead>
                        <tbody  >
                            {
                                games.map(game => (
                                    checkRating(game)
                                )
                                )
                            }
                        </tbody>
                    </table>
                </div>
            </>
        )
    } else {
        return null;
    }
}