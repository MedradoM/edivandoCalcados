import './App.css';
import {db} from './firebase.js';
import {useEffect, useState} from 'react';
import Header from './Header';

function App(props) {

  const [user, setUser] = useState(null);

  const [posts, setPosts] = useState([]);

  useEffect(()=>{
    db.collection('posts').orderBy('timestamp','desc').onSnapshot(function(snapshot){
      setPosts(snapshot.docs.map(function(document){
        return {id:document.id,info:document.data()}

      }))
   })

  },[])

  return (
    <div className="App">
      
      <Header setUser={setUser} user={user}></Header>

      {
        posts.map(function(val){
         
          return(

            
            (props.user)?
            <div className='post-bar'>
              <div className='post'>
                <div className='produto'>
                  <img src={val.info.image}/>
                  <p id='valor'>R${val.info.valor}</p>
                  <p>{val.info.titulo}</p>
                </div>
              </div>
            </div>
            :
            <div className='post-bar'>
            <div className='post'>
              <div className='produto'>
                <img src={val.info.image}/>
                <p id='valor'>R${val.info.valor}</p>
                <p>{val.info.titulo}</p>
                <a >X</a>
              </div>
            </div>
          </div>
          )
        })
      }

      

      <footer className='rodape'>
        <div className='rodape_exterior'>
          <div className='rodape_info'>

          </div>
        </div>
      </footer>

    </div>
  );
}

export default App;