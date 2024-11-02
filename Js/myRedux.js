function createStore(myReducer) {
	let state;
	function dispatch(action) {
		state = myReducer(state, action);
	}
	function getState() {
		return state;
	}
	return { dispatch, getState };
}
