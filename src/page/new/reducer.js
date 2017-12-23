const defaultState={
    newlist:[]
}
const reducer = (state = defaultState, action) => {
    switch (action.type) {
      case 'setnews':
        return  {...state,newlist:action.payload};
      default: 
        return state;
    }
}
export default reducer