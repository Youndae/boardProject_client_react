
//Redux에서 관리할 초기 상태
// const initialState = {
//     user: {},
// }

//action type
const SET_USER = 'SET_USER';
// const DELETE_USER = 'DELETE_USER';

//action function
// export const getToken = data => ({ type: SET_USER, data });



//reducer
export default function user(state = {}, action) {
    console.log('action.type : ', action.type);
    console.log('state : ', state);
    switch (action.type) {
        case SET_USER:
            console.log('action data : ', action.data);
            // console.log('initialState : ', initialState);
            return {
                ...state,
                user : action.data,
            }
        /*case DELETE_USER:
            return {
                ...state,
                user: action.data,
            }*/
        default:
            return state;
    }
}