import React from 'react';
import { useHistory } from 'react-router-dom';

function Home(){
    const history = useHistory();
    return(
        <header className="App-header">
            <p>
                Hello Cafe'
            </p>
            <button className="btn default" 
                    style={{fontSize:'2rem'}}
                    onClick={() => {history.push('/menu-list')}}>
                    สั่งอาหาร
            </button>
        </header>
    );
}
export default Home;