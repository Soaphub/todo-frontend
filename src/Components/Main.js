import React, {useState, useEffect} from 'react';
import useHooks from '../Hooks/useHooks';

const Main = () => {
    // Custom hooks 
    const {screen, text, counts, ClearData, CheckBox, dragReorder, handleDragContainer}= useHooks();

    // State for storing count
    const [countList, setCount]= useState();

    // State for storing data
    const [data, setData]=useState();

    // Calling get data when there is new todoList is created
    useEffect(()=>{
        getData();
    },[text, counts])

    // Geting data from local storage and saving in state variable
    const getData= ()=>{
        const response = JSON.parse(localStorage.getItem("todo-list"));
        if( response){
            setCount(response.counts);
            setData(response.data);
        }
    }


    // ============================
    // Function to filter todo list
    // ============================ 

    // -----------To have all elements--------------
    const handleFilterAll=()=>{
        const activeList= document.querySelector(".filter.active");
        const all= document.getElementById("all");
        activeList.classList.remove("active");
        all.classList.add("active");
        getData();
    }

    //-------Filter Completed and active lists ------------
    const handleFilter=(e)=>{
        const response = JSON.parse(localStorage.getItem("todo-list"));
        const noFilter= response.data;
        const id=e.target.id

        //Removing the active styles for current tab
        const activeList= document.querySelector(".filter.active"); 
        activeList.classList.remove("active");

        //Identifying the clecked tab
        if( id === "active"){
            handleFilterActive(noFilter);
        }else {
            handleFilterComplete(noFilter);
        }
    }

    // -------To filter active list--------
    const handleFilterActive=(noFilter)=>{
        const active= document.getElementById("active");
        active.classList.add("active");
        //Filtering the data
        const filterData= noFilter.filter(data => data.checked===false );
        setData(filterData);
    }

    //----------To filter completed list-----------
    const handleFilterComplete=(noFilter)=>{
        const active= document.getElementById("completed");
        active.classList.add("active");

        //Filtering the data
        const filterData= noFilter.filter(data => data.checked===true);
        setData(filterData);
    }

    
    //  ================================================
    //   To clear the completed list or to delete a todo
    //   ===============================================

    const handleClear=(e)=>{
        const id=e.target.id
        const response = JSON.parse(localStorage.getItem("todo-list"));
        const noFilter= response.data;

        //Removing the active styles for current tab and adding to all
        const activeList= document.querySelector(".filter.active");
        const all= document.getElementById("all");
        activeList.classList.remove("active");
        all.classList.add("active");

        //Identifying the delete option
        if( id === "clear-complete"){
            handleComplete(noFilter);
        }else {
            handleCross({noFilter, id});
        }
    }

    //---------Function to clear completed todo---------
    const handleComplete=(noFilter)=>{
        const clearData= noFilter.filter(data => data.checked!==true);
        const count=  clearData.length;
        setData(clearData);
        setCount(count);
        ClearData({clearData, count});
    }

    //----------Function to clear a todo---------------
    const handleCross=({noFilter, id})=>{
        const Id= id;
        const filterData= noFilter.filter(data => data.checked === true);
        const clearData= noFilter.filter(data => data.id !== Number(Id));
        let count;

        //Checking if the removed data is checked or non checked
        if (filterData.length !== 0) {
            for (let index = 0; index < noFilter.length; index++) {
                let set= 0;
                filterData.forEach(filter => {
                    if(filter.id !== noFilter[index].id && noFilter[index].id === Number(Id)){
                        set = clearData.length - filterData.length;
                    }
                    else if(filter.id === noFilter[index].id && filter.id === Number(Id)){
                        set= countList;
                    }
                });
                if (set !== 0) {
                    count = set;
                }
            }
            setData(count);
        }else {
            count = clearData.length;
            setCount(count);
        }

        setData(clearData);
        ClearData({clearData, count});
    }


    // Function to check checkbox and save it in local storage
    const handleCheckBox=(e)=>{
        CheckBox(e);
    }
    
    //  Handle dragging todo styles
    const handleDrag=()=>{
        dragReorder();
    }

    //  Handle dragging and reoreing the todo
    const handleDragOver=(e)=>{
        handleDragContainer(e);
    }

    return (
        <>
            <div className='main'>
                {/* Form for checklist and todo */}
                <form>
                    <div onDragOver={handleDragOver} className='container'>
                        { data && data.map((item, index)=>{
                            return(
                                <div onDrag={handleDrag} className="draggable" draggable="true" key={index} >
                                    {   item.checked===true ? 
                                        <input onClick={handleCheckBox} type="checkbox" checked={true} id={item.id} readOnly/>:
                                        <input onClick={handleCheckBox} type="checkbox" checked={false} id={item.id} readOnly/>
                                    }
                                    <label htmlFor={item.id}>{item.text}</label>
                                    <img id={item.id} onClick={handleClear} src='./icons/icon-cross.svg' alt='cross'></img>
                                </div>
                            )})
                        }
                    </div>
                </form>
                {/* Last row with all filters */}
                <div className='last-row'>
                    <p>{countList ? countList : "0"} items left</p>
                    <div>
                        {/* Filters are in last row for desktop view */}
                        {screen === false &&
                        <>
                            <p onClick={handleFilterAll} id="all" className='filter active'>All</p>
                            <p onClick={handleFilter} id="active" className='filter'>Active</p>
                            <p onClick={handleFilter} id="completed" className='filter'>Completed</p>
                        </>
                        }
                    </div>
                    <p id="clear-complete" onClick={data && handleClear}>Clear Completed</p>
                </div>
            </div>
            {/* Addtional row with only filters for Mobile view */}
            {screen === true &&
                <div className='filter-row'>
                    <p onClick={handleFilterAll} id="all" className='filter active'>All</p>
                    <p onClick={handleFilter} id="active" className='filter'>Active</p>
                    <p onClick={handleFilter} id="completed" className='filter'>Completed</p>
                </div>
            }
        </>
    );
}

export default Main;




