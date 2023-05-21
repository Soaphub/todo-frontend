import React, {useState, useEffect} from 'react';
import useHooks from '../Hooks/useHooks';


const Header = () => {
    // Custom hooks
    const {toDo, createData, createText} = useHooks();

    const [dark, setDark] = useState();

    useEffect(() => {
        let theme
        theme= localStorage.getItem("theme-value-todo");
        setDark(theme);
        if(theme){
            loadTheme(theme);
        }else{
            theme= getCurrentTheme();
            setDark(theme);
            document.addEventListener("DOMContentLoaded", ()=> loadTheme(theme));
        }
    },[]);

    const getCurrentTheme=()=>{
        const theme= window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
        return theme
    }

    const loadTheme=(themes)=>{
        const root= document.querySelector(":root");
        root.setAttribute("color-scheme", themes);
        if(themes==="dark"){
            setDark(true);
        }else{
            setDark(false);
        }
        localStorage.setItem("theme-value-todo", themes);
    }

    const handleClick=()=>{
        setDark(prev => !prev);
        changeColor();
    }

    const changeColor=()=>{
        let themes
        if(dark===true){
            themes= "light";
        }else{
            themes = "dark";
        }
        loadTheme(themes);
    }

    // Tiggers this function when pressed Enter
    const handleData=(e)=>{
        createData(e);
    }

    // Tiggers this function when thre is change in char
    const handleChange=(e)=>{
        createText(e);
    }

    return (
        <div className='header'>
            <div>
                <h1>TODO</h1>
                {   dark=== true ? 
                    <img onClick={handleClick} src="./icons/icon-sun.svg" alt='sun'></img>:
                    <img onClick={handleClick} src="./icons/icon-moon.svg" alt='moon'></img>
                }
            </div>
            {/* Form for inputing new todo list */}
            <form onKeyDown={handleData}>
                <input id="input" onChange={handleChange} type='text' name="todo" 
                    placeholder='Create a new todo....' value={toDo}>
                </input>
            </form>
        </div>
    );
}

export default Header;
