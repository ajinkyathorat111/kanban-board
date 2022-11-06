import React from 'react';
import "./Modal.css";

export default function Modal(props) {
  return (
    <div className='modal'
    onClick={(event) => (props.onClose ? props.onClose() : "")}
    >
        <div 
        className='modal_content'
        onClick={(event) => {event.stopPropagation()}}
        >
            {props.children}
        </div>
    </div>
  )
}
