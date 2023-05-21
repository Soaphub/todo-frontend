# Frontend Mentor - Room homepage solution

This is a solution to the [Todo app challenge on Frontend Mentor](https://www.frontendmentor.io/challenges/todo-app-Su1_KokOW). Frontend Mentor challenges help you improve your coding skills by building realistic projects. 

## Table of contents

- [Overview](#overview)
  - [The challenge](#the-challenge)
  - [Links](#links)
- [My process](#my-process)
  - [Built with](#built-with)
  - [What I learned](#what-i-learned)
  - [Continued development](#continued-development)
  - [Useful resources](#useful-resources)
- [Author](#author)
- [Acknowledgments](#acknowledgments)

## Overview

### The challenge

Users should be able to:

- View the optimal layout for the app depending on their device's screen size
- See hover states for all interactive elements on the page
- Add new todos to the list
- Mark todos as complete
- Delete todos from the list
- Filter by all/active/complete todos
- Clear all completed todos
- Toggle light and dark mode
- **Bonus**: Drag and drop to reorder items on the list

### Links

- Solution URL: [https://github.com/Soaphub/todo-frontend]
- Live Site URL: [https://todo-frontend-iota-three.vercel.app/]

## My process

### Built with

- Semantic HTML5 markup
- Flexbox
- CSS Grid
- Mobile-first workflow
- [React](https://reactjs.org/) - JS library


### What I learned

Learned to filter component within two array to find the its checked or not.

```js
    const handleCross=({noFilter, id})=>{
        const Id= id;
        const filterData= noFilter.filter(data => data.checked === true);
        const clearData= noFilter.filter(data => data.id !== Number(Id));
        let count;
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
```

### Useful resources

- [https://www.youtube.com/c/codinginpublic]- This helped me Light & Dark Mode with CSS Variables
- [https://www.youtube.com/watch?v=jfYWwQrtzzY&ab_channel=WebDevSimplified]- This helped me for drag and drop function

## Author

- Website - [Ambadi](https://soaphub.github.io/Mysite/)
- Frontend Mentor - [@Soaphub](https://www.frontendmentor.io/profile/Soaphub)

## Acknowledgments

The udemdy coarse by Angela helped a lot in completing the project.
