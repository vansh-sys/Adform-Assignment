import React from 'react';
import { connect } from 'react-redux';
import {fetchCampaigns,searchByName,prepareRowData,filterByDate,addNewCampaigns} from '../actions/campaignActions';
import 'ag-grid-community/dist/styles/ag-grid.css'
import 'ag-grid-community/dist/styles/ag-theme-balham.css';
import { AgGridReact } from 'ag-grid-react';
import DatePicker from 'react-date-picker';
import StatusRederer from './StatusRenderer';
import '../index.css';
import addFormLogo from '../addform.png';
import { createSelector } from 'reselect';
import { SearchBox } from './SearchBox';

export class CampaignList extends React.Component{
    constructor()
    {
        super();
        this.state={
            isSearch : false,
            startDate: null,
            endDate : null,
            dateFilter :false,
            userList:[],
            campaignList:[],
            preparedList:[]
        }
    }
    componentDidMount(){
        window.map=this;
        this.props.fetchCampaigns();
        //console.log("response",fetchResponse)
    }

    addCampaigns(campaigns=[]){
        this.props.addNewCampaigns(campaigns)
    }

    onSearch=(e)=>{
            this.setState({isSearch:true})
            this.props.searchByName(e.target.value)
            if(e.target.value==="" && this.state.dateFilter===false)
                this.setState({isSearch:false})
            else if(e.target.value==="" && this.state.dateFilter===true)
                this.props.filterByDate(this.state.startDate,this.state.endDate,this.props.preparedList)
            }

    prepareRowData=(users)=>{
        this.props.prepareRowData(users);
        return this.props.campaigns
    }

    onStartDateChange=(date)=>{
        this.setState({
            startDate : date,
            dateFilter: true
        },this.props.filterByDate(date,this.state.endDate,this.props.campaignList))
        
        if(date===null && this.state.endDate===null && this.state.isSearch===false){
            this.setState({
                dateFilter:false
            })
        }
    }

    onEndDateChange=(date)=>{
        this.setState({
            endDate : date,
            dateFilter:true
        },this.props.filterByDate(this.state.startDate,date,this.props.preparedList))
        
        if(this.state.startDate===null && date===null && this.state.isSearch===false){
            this.setState({
                dateFilter:false
            })
        }
    }

    render(){
        let rowData = []
        //console.log("props",this.props.userList)
        if(this.props.userList.length>0){
            if(!this.state.isSearch && !this.state.dateFilter){
                this.prepareRowData(this.props.userList)
            }
            rowData=this.props.campaignList
        }
        let columnDefs= [
            { headerName: "Name", field: "name" , filter: true},
            { headerName: "User Name", field: "userName" },
            { headerName: "Start Date", field: "startDate" },
            { headerName: "End Date", field: "endDate" },
            { headerName: "Status", field: "status",cellRenderer: "statusRederer"},
            { headerName: "Budget", field: "budget" },
          ]
        let frameworkComponents= {
            statusRederer: StatusRederer
        }
        //this.gridApi.sizeColumnsToFit();
        return(
            
            <div>
                <header className="header">
                <img src={addFormLogo} alt="test logo" className="addFormLogo"></img>
                </header>
                
                <SearchBox onSearch={this.onSearch}/>

                <span className="dateFilter">Filter (by date) :</span>

                <span className="start-date">
                <DatePicker
                    onChange={this.onStartDateChange}
                    name="startDate"
                    dayPlaceholder="dd"
                    monthPlaceholder="mm"
                    yearPlaceholder="yyyy"
                    value={this.state.startDate}
                    className="datePicker"
                />
                </span>

                <span className="end-date">
                <DatePicker
                    onChange={this.onEndDateChange}
                    name="endDate"
                    value={this.state.endDate}
                    dayPlaceholder="dd"
                    monthPlaceholder="mm"
                    yearPlaceholder="yyyy"
                    className="datePicker"
                />
                </span>
                
                <br/>
                <br/>
                <div className="ag-theme-balham ag-grid-custom">
                    <AgGridReact
                        columnDefs={columnDefs}  
                        rowData={rowData}
                        frameworkComponents={frameworkComponents}>
                    </AgGridReact>
                </div>

            </div>
            
        )
    }
    
}

const selectUserList = state => state.userList;
const selectCampaigns = state => state.campaignList;
const selectPreparedList = state => state.preparedList

const selectCampaignUsers = createSelector(
    [selectUserList,selectCampaigns,selectPreparedList],
    (userList,campaignList,preparedList) => {
         return {userList,campaignList,preparedList}
    }
)

const mapStateToprops = (state) => {
    let data = selectCampaignUsers(state)
    console.log("data returned",data)
    return data;
}

export default connect(
    mapStateToprops,{fetchCampaigns,searchByName,prepareRowData,filterByDate,addNewCampaigns}
)(CampaignList)