import React from 'react'
import onlineLogo from '../online.png';
import offlineLogo from '../offline.png';
import '../index.css';

export default class StatusRenderer extends React.Component {
    render() {
        return <span>{this.props.value ==='Active' ? 
        <span className="status">
            <img src={onlineLogo} className="image-adjust" alt="logo"/>
            {this.props.value}
        </span>    
        : <span className="status">
            <img src={offlineLogo} className="image-adjust" alt="logo"/>
            {this.props.value}
    </span>
      }
        </span>;
    }
  }