// get html elements and store in variables
const inputElement = document.querySelector(".input");
const addBtn = document.querySelector(".add-btn");
const todosContainerElement = document.querySelector(".todos-container");
const selectBoxElement = document.querySelector(".select-box");

// input value
let inputValue = "";

// todo actions
const addTodoAction = "ADD";
const deleteTodoAction = "DELETE";
const completeTodoAction = "COMPLETE";

const filterAllTodosAction = "FILTER_ALL";
const filterCompletedTodosAction = "FILTER_COMOLETE";
const filterUncompletedTodosAction = "FILTER_UNCOMPLETE";

// todo actions creators
const addTodoActionCreators = (title) => {
	return { type: addTodoAction, title };
};
const deleteTodoActionCreators = (id) => {
	return { type: deleteTodoAction, id };
};
const completeTodoActionCreators = (id) => {
	return { type: completeTodoAction, id };
};

// create a store with redux
const store = Redux.createStore(todoReducer);

// todo reducer
function todoReducer(state = [], action) {
	switch (action.type) {
		case addTodoAction: {
			let newState = [...state];

			let newTodoObject = {
				id: Math.floor(Math.random() * 1000),
				title: action.title,
				isComplete: false,
			};

			newState.push(newTodoObject);

			return newState;
		}
		case deleteTodoAction: {
			let newState = [...state];

			let filteredState = newState.filter((todo) => {
				return todo.id !== action.id;
			});

			return filteredState;
		}
		case completeTodoAction: {
			let newState = [...state];

			newState.some((todo) => {
				if (todo.id == action.id) {
					todo.isComplete = !todo.isComplete;
				}
			});

			return newState;
		}
		default: {
			return state;
		}
	}
}

// thid add event for add new todo
addBtn.addEventListener("click", () => {
	let newTodoTitle = inputElement.value.trim();

	if (newTodoTitle.length) {
		store.dispatch(addTodoActionCreators(newTodoTitle));

		const todosArray = store.getState();
		generateTodosToDom(todosArray);
		inputElement.value = "";
	}
});

// this func handle delete todo when we send id for his
function deleteTodoHandler(todoId) {
	store.dispatch(deleteTodoActionCreators(todoId));

	const todosArray = store.getState();
	generateTodosToDom(todosArray);
}

// this func handle complete todo when we send id for his
function completeTodoHandler(todoId) {
	store.dispatch(completeTodoActionCreators(todoId));

	const todosArray = store.getState();
	generateTodosToDom(todosArray);
}

//
selectBoxElement.addEventListener("change", () => {
	const todosArray = store.getState();

	if (selectBoxElement.value == "all") {

		generateTodosToDom(todosArray);

	} else if (selectBoxElement.value == "completed") {

		let filteredState = todosArray.filter((todo) => todo.isComplete);
		generateTodosToDom(filteredState);

	} else if (selectBoxElement.value == "uncompleted") {

		let filteredState = todosArray.filter((todo) => !todo.isComplete);
		generateTodosToDom(filteredState);
		
	}
});

// this function get a array of todos and add to dom
function generateTodosToDom(todos) {
	todosContainerElement.innerHTML = "";

	todos.forEach((todo) => {
		todosContainerElement.insertAdjacentHTML(
			"beforeend",
			`<div class="todo-wrapper ${todo.isComplete && "complete"}">
				<span class="todo-title">${todo.title}</span>
				<div class="todo-btns">
					<button class="btn complete-btn" onclick=completeTodoHandler(${
						todo.id
					})>COMPLETE</button>
					<button class="btn delete-btn" onclick=deleteTodoHandler(${
						todo.id
					})>DELETE</button>
				</div>
			</div>`
		);
	});
}
