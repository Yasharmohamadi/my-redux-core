function createStore(reducer) {
    let state
	function dispatch() {}
	function getState() {}
    return {dispatch, getState}
}


const myStore = createStore(() => {})
console.log(myStore); // {dispatch , getState}