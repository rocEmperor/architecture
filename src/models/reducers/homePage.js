const initState = {
    name: '李四'
};
let homePage = (state = initState, action) => {
    switch (action.type) {
        case 'changeNameStore':
            return {...state, ...action.payload}
        default:
            return state
    }
};

export default homePage;