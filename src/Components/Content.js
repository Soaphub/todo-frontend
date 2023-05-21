import React from 'react';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import "../styles/content.css"

const Content = () => {
    return (
        <div className='content'>
            <Header/>
            <Main/>
            <Footer/>
        </div>
    );
}

export default Content;
