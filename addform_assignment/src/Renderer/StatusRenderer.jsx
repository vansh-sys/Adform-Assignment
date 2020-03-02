/* eslint-disable linebreak-style */
/* eslint-disable react/prefer-stateless-function */
/* eslint-disable linebreak-style */
import React from 'react';
import onlineLogo from '../logos/online.png';
import offlineLogo from '../logos/offline.png';
import '../index.css';

export default class StatusRenderer extends React.Component {
  render() {
    return (
      <span>
        {this.props.value === 'Active'
          ? (
            <span className="status">
              <img src={onlineLogo} className="image-adjust" alt="logo" />
              {this.props.value}
            </span>
          )
          : (
            <span className="status">
              <img src={offlineLogo} className="image-adjust" alt="logo" />
              {this.props.value}
            </span>
          )}
      </span>
    );
  }
}
