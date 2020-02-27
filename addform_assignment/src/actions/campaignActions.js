export const fetchCampaigns = () => async (dispatch) => {
    var users=[];
    fetch('https://jsonplaceholder.typicode.com/users')
    .then(res=>res.json())
        .then(data=>{
                users=data
                dispatch({ type: "FETCH_CAMPAIGNS", payload: users})
             })
             .catch(error=>error);
};

export const prepareRowData = (payload) => (dispatch) => {
    dispatch({
        type : 'PREPARE_ROWS',
        payload : payload
    })
}

export const searchByName = (name) => (dispatch) => {
    dispatch({
        type : 'ON_SEARCH',
        payload : name
    })
}

export const filterByDate = (startDate,endDate)=>(dispatch)=>{
    dispatch({
        type: 'DATE_FILTER',
        payload: {startDate,endDate}
    })
}

export const addNewCampaigns = (campaigns)=>(dispatch)=>{
    dispatch({
        type: 'ADD_CAMPAIGNS',
        payload: campaigns
    })
}