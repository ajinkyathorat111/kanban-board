import React, { useRef, useEffect } from 'react';

export default function Dropdown(props) {

    // const dropdownRef = useRef();

    const handleClick = (event) => {
        // console.log("eevnet target ",event.target, dropdownRef.current);
        // console.log(props, dropdownRef);
        // console.log("dropdownRef.current.contains(event.target)", dropdownRef.current.contains(event.target))
        if (props.parentMore && !props.parentMore.current.contains(event.target)) {
            if (props.onClose) {
                props.onClose();
            } 
        }
    }

    useEffect(() => {
      document.addEventListener("click", handleClick);
        

      return () => {
        document.removeEventListener("click", handleClick);
      }
    })
    
  return (
    <div 
    // ref={dropdownRef} 
    className='dropdown'
    style={{
        position: "absolute",
        top: "100%",
        right: "0"
    }}
    >
        {props.children}
    </div>
  )
}
