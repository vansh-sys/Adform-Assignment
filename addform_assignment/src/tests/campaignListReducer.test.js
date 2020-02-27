import reducer from '../reducers/campaignListReducer'
describe('campaign reducer', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual([
        {
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
    ])
  })
})