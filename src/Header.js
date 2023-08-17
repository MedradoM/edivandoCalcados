import {useEffect, useState} from 'react';
import Logo from "./resources/Logo.png";
import {auth, storage, db} from './firebase.js';
import firebase from 'firebase';

function Header(props){
  
const [progress,setProgress] = useState(0);

const [file, setFile] = useState(null);


    useEffect(()=>{
        props.setUser();
      },[])

      function abrirModalUpload(e){
        e.preventDefault();
        let modal = document.querySelector('.modalUpload');

        modal.style.display = "block";
      }
      
      function fecharModalUpload(){

        let modal = document.querySelector('.modalUpload');
        modal.style.display = "none"
      }

      function uploadPost(e){
        e.preventDefault();
        let tituloPost = document.getElementById('titulo-upload').value;
        let valorPost = document.getElementById('formValor').value;

        const uploadTask = storage.ref(`images/${file.name}`).put(file);

        uploadTask.on("state_changed",function(snapshot){
          const progress = Math.round(snapshot.bytesTransferred/snapshot.totalBytes) * 100;
          setProgress(progress);
        },function(error){
          alert('deu erro fião:');
        },function(){

          storage.ref('images').child(file.name).getDownloadURL()
          .then(function(url){
            db.collection('posts').add({
              titulo: tituloPost,
              image: url,
              valor: valorPost,
              timestamp: firebase.firestore.FieldValue.serverTimestamp()
            })
              setProgress(0);
              setFile(null);

              alert('Upload realizado com Sucesso');

              document.getElementById('form-upload').reset();
              fecharModalUpload();
          })
        })
      }

      function logar(e){
        e.preventDefault();
        let email = document.getElementById('email-login').value;
        let senha = document.getElementById('senha-login').value;

        auth.signInWithEmailAndPassword(email,senha)
        .then((auth)=>{
          props.setUser('ADM');
          alert('logado com sucesso');
        }).catch((err)=>{
          alert(err.message)
        })
      }
      
    return (
        <div className='header'>

        <div className='modalUpload'>
          <div className='formUpload'>
            <div onClick={()=>fecharModalUpload()} className='close-modal-upload'>X</div>
            <h2>Postar Produto!</h2>
            <form id='form-upload' onSubmit={(e)=>uploadPost(e)}>
              <progress id='progress-upload' value={progress}></progress>
              <input type='text' id='titulo-upload' placeholder='nome do produto'/>
              <input type='text' id='formValor' placecholder='Valor do produto'/>
              <input onChange={(e)=>setFile(e.target.files[0])} type='file' name='file'/>
              <input type='submit' value='Postar produto!'/>
            </form>
          </div>
        </div>

        <div className='center'>
          <div className='header__logo'>
            <a href=''><img src={Logo}/> </a>
          </div>
            {
              (props.user)?
              <div className='header__logadoInfo'>
                <span>Olá, <b>{props.user}</b></span>
                <a onClick={(e)=>abrirModalUpload(e)} href='#'>Adicionar Produto</a>
              </div>
              :
              <div className='haeder__loginForm'>
              <form onSubmit={(e)=>logar(e)}>
                <input id='email-login' type='text' placeholder='Login...'/>
                <input id='senha-login' type='password' placeholder='Senha...'/>
                <input type='submit' name='acao' value='Logar'/>
              </form>
            </div>
            }
        </div>
        <div className='nav'>    
          <div className='navTable'>
                  <a id='masc_nav' href=''>Masculino</a>
                  <a id='fem_nav' href=''>Feminino</a>
                  <a id='inf_nav' href=''>Infantil</a>
                  <a id='aces_nav' href=''>Acessórios</a>
          </div>
        </div>  
</div>
    )

}

export default Header;


