import { createSlice } from '@reduxjs/toolkit'

const initialState = {
	id: 1,
	counts: 0,
	text: ""
}


export const counterSlice = createSlice({
  	name: 'todo',
  	initialState,
  	reducers: {
		// Adding to do list to json data and saving in local staorage
  	  	wishList: (state, action) => {
			// Geting data from local Storage
			const response = JSON.parse(localStorage.getItem("todo-list"));

			// Updating the new todoList
			state.text = action.payload;

			// Converting all data into Json format
			const jsonData={
				counts: state.counts,
            	data : []
			};
			const eachData = {
				id: state.id,
				text: state.text,
				checked: false
			};
			jsonData.data.push(eachData);

			// Adding data to the existing data in localStorage
  	  	  	if(response){
				const data= response.data;
				const repeat= data.find(item=> item.text===state.text);
				if(!repeat){
					// updating count and id
					const length = data.length;
					let high = 0;
					for (let index = 0; index < length; index++) {
						if(data[index].id > data[length-1].id){
							high = data[length-1].id;
						}else if(data[index].id > high){
							high = data[index].id;
						}
					}
					state.id = high + 1;
					response.counts += 1;
					state.counts = response.counts;

					// pusing new data to the array
					eachData.id= state.id;
					data.push(eachData);

					// saving data from local Storage
					localStorage.setItem("todo-list", JSON.stringify(response));
				}
			// Comminting intial data into localStorage
  	  	  	}else{
				state.id += 1;
				jsonData.counts += 1;

				// saving data from local Storage
  	  	  	  	localStorage.setItem("todo-list", JSON.stringify(jsonData));
  	  	  	}
  	  	},

		// Updating checkBox of toDo and saving in local staorage
		checkedList : (state, action) => {
			// Geting data from local Storage
			const response = JSON.parse(localStorage.getItem("todo-list"));

			// uploading values from custome hooks
			const id = action.payload.id;
			const checked= action.payload.checked;
			const checkedData= response.data.find(data => data.id === Number(id));

			// Updating the count value per checkbox
			if (checked) {
				if(response.counts > 0){
					response.counts -= 1;
					state.counts = response.counts;
				}
			}else{
				response.counts += 1;
				state.counts = response.counts;
			}
			checkedData.checked = checked;

			// saving data from local Storage
			localStorage.setItem("todo-list", JSON.stringify(response));
		},

		// Clear all completed data and save in localStorage
		clear: (state, action) =>{
			// Geting data from local Storage
			const response = JSON.parse(localStorage.getItem("todo-list"));

			// Updating the data and count
			const clear= action.payload.clearData;
			response.counts= action.payload.count;
			state.counts = response.counts;
			response.data= clear;
			
			// saving data from local Storage
			localStorage.setItem("todo-list", JSON.stringify(response));
		},
  	},
})

// Action creators are generated for each case reducer function
export const { wishList, checkedList, clear} = counterSlice.actions

export default counterSlice.reducer