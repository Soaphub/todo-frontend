import React from 'react';
import useHooks from '../Hooks/useHooks';


const Footer = () => {
    // Custom hooks
    const {screen} = useHooks();

    return (
        <div className='footer'>
            { screen===false && <p>Drag and drop to reorder the list</p>}
        </div>
    );
}

export default Footer;
