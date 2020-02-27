import React from 'react'
import '../index.css';

export const SearchBox = (props) =>{
    
    return (
        <input 
        type="text" 
        onChange={props.onSearch} 
        name="name" placeholder="Search By Name"
        className="search-box"
        />
        )
    
}