import { useState, useEffect} from 'react';
import { useDispatch, useSelector} from 'react-redux'
import { wishList, checkedList, clear} from '../redux/counterSlice'

const UseHooks = () => {
    // Tracking the screen size 
    const [screen, setScreen] = useState(false);

    // Saving the newly created todo list
    const [toDo, setToDo]= useState("");

    // Importing data from redux file
    const {text, counts} = useSelector((state) => state.todo);
    const dispatch = useDispatch();

    // Checking the screen size and triggering the function in mobile view
    useEffect(()=>{
        const mobView = window.matchMedia("(max-width: 992px)");
        if (mobView.matches) { 
            setScreen(true);
        }
    },[]);

    // Saving each charecter the user typed 
    const createText=(e)=>{
        setToDo(e.target.value);
    }

    const createData=(e)=>{
        if( e.key === "Enter"){
            e.preventDefault();
            if(toDo!==""){
                dispatch(wishList(toDo));
            }
        } 
    }
    
    // Saving checked in local Storage
    const CheckBox=(e)=>{
        const id= e.target.id;
        const checked = e.target.checked;
        dispatch(checkedList({id, checked}));
    }

    const ClearData=({clearData, count})=>{
        dispatch(clear({clearData, count}));
    }

    // Handle dragging and reordering the todo
    const dragReorder=()=>{
        const draggable= document.querySelectorAll(".draggable");

        draggable.forEach(draggable =>{
            draggable.addEventListener("dragstart", ()=>{
                draggable.classList.add("dragging");
            });
            draggable.addEventListener("dragend", ()=>{
                draggable.classList.remove("dragging");
            });
        } );
    }

    const handleDragContainer=(e)=>{
        e.preventDefault();
        const container = document.querySelector(".container");
        const afterElement = getAfterElement(e.clientY);
        const draggable= document.querySelector(".dragging");
        if(draggable === null){
            return;
        }
        if (afterElement !== null ) {
            container.insertBefore(draggable, afterElement);
          } else {
            container.appendChild(draggable);
          }
    }

    const getAfterElement =(y)=>{
        const NotDragingElemnt= [...document.querySelectorAll(".draggable:not(.dragging)")];
        return NotDragingElemnt.reduce((closest, child)=>{
            const box = child.getBoundingClientRect();
            const offset = y - (box.top - box.height / 2)
            if( offset < 0 && offset > closest.offset){
                return { offset : offset , element: child};
            } else{
                return closest;
            }
        }, {offset : Number.NEGATIVE_INFINITY}).element
    }

    return{screen, toDo, text, counts, createData, createText, CheckBox, ClearData, dragReorder, handleDragContainer};
}

export default UseHooks;
