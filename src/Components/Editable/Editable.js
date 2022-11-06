import {React, useState} from 'react';
import { X } from 'react-feather';
import "./Editable.css";

export default function Editable(props) {

    const [showEdit, setshowEdit] = useState(false);
    const [inputValue, setInputValue] = useState(props.text || "");

  return (
    <div className='editable'>
        {
            showEdit ? 
            (
                <form className={`editable_edit ${props.editClass || ""}`}
                    onSubmit={
                        (e) => {
                            e.preventDefault();
                            if (props.onSubmit) {
                                props.onSubmit(inputValue);
                                setshowEdit(false);
                                setInputValue(props.text || "");
                            }
                        }
                    }
                >
                    <input 
                        type="text"
                        value={inputValue}
                        onChange={(e) => {setInputValue(e.target.value)}}
                        // defaultValue={props.text}
                        placeholder={props.placeholder}
                    >
                    </input>
                    <div className='editable_edit_footer'>
                        <button type='subit'>{props.buttonText || "Add"}</button>
                        <X onClick={() => setshowEdit(false)}></X>
                    </div>
                </form>
            )
            :
            <p className={`editable_display ${props.displayClass || ""}`} 
            onClick={() => setshowEdit(true)}
            >
                {props.text || "Add Item"}
            </p>
        }
        
    </div>
  )
}
