/* eslint-disable max-len */
/* eslint-disable react/destructuring-assignment */
import React from 'react';
import { connect } from 'react-redux';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-balham.css';
import { AgGridReact } from 'ag-grid-react';
import DatePicker from 'react-date-picker';
import {
  fetchCampaigns, searchByName, prepareRowData, filterByDate, addNewCampaigns,
} from '../actions/campaignActions';
import StatusRederer from '../Renderer/StatusRenderer';
import '../index.css';
import addFormLogo from '../logos/addform.png';
import SearchBox from './SearchBox';
import Translations from '../translations/constants';
import selectCampaignUsers from '../Selectors/selectors';

export class CampaignList extends React.Component {
  constructor() {
    super();
    this.state = {
      isSearch: false,
      startDate: null,
      endDate: null,
      dateFilter: false,
    };
  }

  componentDidMount() {
    window.map = this;
    this.props.fetchCampaigns();
    // console.log("response",fetchResponse)
  }


  onSearch(e) {
    this.setState({ isSearch: true });
    this.props.searchByName(e.target.value);
    if (e.target.value === Translations.emptyString && this.state.dateFilter === false) { this.setState({ isSearch: false }); } else if (e.target.value === Translations.emptyString && this.state.dateFilter === true) { this.props.filterByDate(this.state.startDate, this.state.endDate, this.props.preparedList); }
  }


  onStartDateChange(date) {
    this.setState({
      startDate: date,
      dateFilter: true,
    }, this.props.filterByDate(date, this.state.endDate, this.props.campaignList));

    if (date === null && this.state.endDate === null && this.state.isSearch === false) {
      this.setState({
        dateFilter: false,
      });
    }
  }

  onEndDateChange(date) {
    this.setState({
      endDate: date,
      dateFilter: true,
    }, this.props.filterByDate(this.state.startDate, date, this.props.preparedList));


    if (this.state.startDate === null && date === null && this.state.isSearch === false) {
      this.setState({
        dateFilter: false,
      });
    }
  }

  render() {
    let rowData = [];
    // console.log("props",this.props.userList)
    if (this.props.userList.length > 0) {
      if (!this.state.isSearch && !this.state.dateFilter) {
        this.props.prepareRowData(this.props.userList);
      }
      rowData = this.props.campaignList;
    }
    const columnDefs = [
      { headerName: Translations.upperName, field: Translations.lowerName, filter: true },
      { headerName: Translations.upperUserName, field: Translations.lowerUserName },
      { headerName: Translations.upperStartDate, field: Translations.lowerStartDate },
      { headerName: Translations.upperEndDate, field: Translations.lowerEndDate },
      { headerName: Translations.upperStatus, field: Translations.lowerStatus, cellRenderer: 'statusRederer' },
      { headerName: Translations.upperBudget, field: Translations.lowerBudget },
    ];
    const frameworkComponents = {
      statusRederer: StatusRederer,
    };
    // this.gridApi.sizeColumnsToFit();
    return (
      <div>
        <header className="header">
          <img src={addFormLogo} alt="test logo" className="addFormLogo" />
        </header>

        <SearchBox onSearch={(e) => this.onSearch(e)} />

        <span className="dateFilter">Filter (by date) :</span>

        <span className="start-date">
          <DatePicker
            onChange={(e) => this.onStartDateChange(e)}
            name={Translations.startDate}
            dayPlaceholder={Translations.dateFormat}
            monthPlaceholder={Translations.monthFormat}
            yearPlaceholder={Translations.yearFormat}
            value={this.state.startDate}
            className="datePicker"
          />
        </span>

        <span className="end-date">
          <DatePicker
            onChange={(e) => this.onEndDateChange(e)}
            name={Translations.endDate}
            value={this.state.endDate}
            dayPlaceholder={Translations.dateFormat}
            monthPlaceholder={Translations.monthFormat}
            yearPlaceholder={Translations.yearFormat}
            className="datePicker"
          />
        </span>

        <br />
        <br />
        <div className="ag-theme-balham ag-grid-custom">
          <AgGridReact
            columnDefs={columnDefs}
            rowData={rowData}
            frameworkComponents={frameworkComponents}
            suppressHorizontalScroll
            false
            colResizeDefault
          />
        </div>

      </div>

    );
  }
}

const mapStateToprops = (state) => {
  const data = selectCampaignUsers(state);
  return data;
};

export default connect(
  mapStateToprops, {
    fetchCampaigns, searchByName, prepareRowData, filterByDate, addNewCampaigns,
  },
)(CampaignList);
