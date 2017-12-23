const defaultState={
    newdetail:[]
}

const reducer = (state = defaultState, action) => {
    switch (action.type) {
      case 'gaindetail':
        return  {...state,newdetail:action.payload};
      default: 
        return state;
    }
}
export default reducer