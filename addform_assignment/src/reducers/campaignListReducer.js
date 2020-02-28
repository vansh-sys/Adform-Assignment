import moment from 'moment'

const initialState = {
    userList : [],
    isLoading : true,
    campaignList:[
        {
           "id":1,
           "name":"Divavu",
           "startDate":"9/19/2019",
           "endDate":"3/9/2020",
           "Budget":88377,
           "userId":10
        },
        {
           "id":2,
           "name":"Jaxspan",
           "startDate":"11/21/2019",
           "endDate":"2/21/2020",
           "Budget":608715,
           "userId":6
        },
        {
           "id":3,
           "name":"Miboo",
           "startDate":"11/1/2019",
           "endDate":"6/20/2020",
           "Budget":239507,
           "userId":7
        },
        {
           "id":4,
           "name":"Trilith",
           "startDate":"8/25/2017",
           "endDate":"11/30/2019",
           "Budget":179838,
           "userId":1
        },
        {
           "id":5,
           "name":"Layo",
           "startDate":"11/28/2019",
           "endDate":"3/10/2020",
           "Budget":837850,
           "userId":9
        },
        {
           "id":6,
           "name":"Photojam",
           "startDate":"7/25/2017",
           "endDate":"6/23/2019",
           "Budget":858131,
           "userId":3
        },
        {
           "id":7,
           "name":"Blogtag",
           "startDate":"6/27/2018",
           "endDate":"1/15/2020",
           "Budget":109078,
           "userId":2
        },
        {
           "id":8,
           "name":"Rhyzio",
           "startDate":"10/13/2019",
           "endDate":"1/25/2020",
           "Budget":272552,
           "userId":4
        },
        {
           "id":9,
           "name":"Zoomcast",
           "startDate":"9/6/2019",
           "endDate":"11/10/2020",
           "Budget":301919,
           "userId":8
        },
        {
           "id":10,
           "name":"Realbridge",
           "startDate":"3/5/2018",
           "endDate":"10/2/2020 ",
           "Budget":505602,
           "userId":5
        }
     ],
     preparedList:[]
}


export function campaignListReducer (state = initialState, action) {
    console.log("action dispatched",action)
    switch (action.type) {
        case 'FETCH_CAMPAIGNS':
            if(action.payload){
                state = {
                    ...state,
                    isLoading : false,
                    userList : action.payload
                }
            }
            return state;
        
        case 'PREPARE_ROWS':
            if(action.payload){
                    let users = action.payload
                    let campaignList = state.campaignList
                    let currentTime= new Date().getTime();
                    const checkTime=(campaign)=>{
                        let startTime = new Date(campaign.startDate).getTime()
                        let endTime= new Date(campaign.endDate).getTime()
                        if(currentTime>startTime && currentTime<endTime)
                            return true
                        else
                            return false;
                    }
                    campaignList.map((campaign)=>{
                        if(checkTime(campaign))
                            campaign.status="Active"
                        else
                            campaign.status="InActive"
                        campaign.budget=new Intl.NumberFormat('en-GB', { notation: "compact" , compactDisplay: "long", style: 'currency', currency: 'USD' }).format(campaign.Budget);
                        campaign.userName="Unknown User"
                        return true
                    })

                    users.map((user)=>{
                        campaignList.map((campaign)=>{
                            if(campaign.userId===user.id){
                                campaign.userName=user.name
                            }
                            return true
                        })
                        return true
                    })

                    state={ ...state,
                            userList : users,
                            campaignList : campaignList,
                            preparedList : campaignList
                        }

                    return state;
            }
        break;
        case 'ON_SEARCH':
            if(action.payload && action.payload!==""){
                let updatedCampaignList = []
                let currentCampaignList=[...state.preparedList]
                let searchKey=action.payload
                currentCampaignList.map((campaign)=>{
                    if(campaign.name.toLowerCase().search(searchKey.toLowerCase())!==-1){
                        updatedCampaignList.push(campaign)
                    }
                    return true
                })
                    state={
                        ...state,
                        campaignList : updatedCampaignList
                    }
                }
                else{
                    state={
                        ...state,
                        campaignList : initialState.campaignList
                    }
                }
                return state;
        case 'DATE_FILTER':
            //console.log("reducer",action.payload)
            if(action.payload){
                let startDate = action.payload.startDate
                let endDate = action.payload.endDate
                let currentCampaignList=[...action.payload.campaignList]
                let updatedCampaignList = []
                if(startDate !== null && endDate === null)
                {
                    currentCampaignList.map((campaign)=>{
                        if(moment(new Date(campaign.startDate)).isAfter(startDate)){
                            updatedCampaignList.push(campaign)
                        }
                        return true
                    })
                    state={
                        ...state,
                        campaignList : updatedCampaignList
                    }
                }

                else if(startDate === null && endDate !== null)
                {

                    currentCampaignList.map((campaign)=>{
                        if(moment(new Date(campaign.endDate)).isBefore(endDate)){
                            updatedCampaignList.push(campaign)
                        }
                        return true
                    })
                    state={
                        ...state,
                        campaignList : updatedCampaignList
                    }
                }

                else if(startDate !== null && endDate !== null){
                    currentCampaignList.map((campaign)=>{
                        if(moment(new Date(campaign.endDate)).isBetween(startDate,endDate)){
                            updatedCampaignList.push(campaign)
                        }
                        return true
                    })
                    state={
                        ...state,
                        campaignList : updatedCampaignList
                    }
                }
                else{
                    state={
                        ...state,
                        campaignList : initialState.campaignList
                    }
                }

                return state;
            }
        break;
        case 'ADD_CAMPAIGNS':
            if(action.payload){
                let currentCampaignList=[...state.preparedList]
                let newCampaigns = action.payload
                newCampaigns.map((newCampaign)=>{
                    currentCampaignList.push(newCampaign)
                    return true
                })

                state={
                    ...state,
                    campaignList : currentCampaignList
                }

            }
            return state;
            
        default : 
            return state;
    }
}
