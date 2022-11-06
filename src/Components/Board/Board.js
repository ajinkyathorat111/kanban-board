import React from 'react';
import "./Board.css";
import { MoreHorizontal } from 'react-feather';
import Card from '../Card/Card';
import Editable from '../Editable/Editable';
import Dropdown from '../Dropdown/Dropdown';
import { useState, useRef } from "react";

function Board(props) {

    const [showDropdown, setshowDropdown] = useState(false);
    const moreRef = useRef();

  return (
    <div className='board'>

        <div className='board_top'>
            <p className='board_title'>
               { props.board?.title } <span>{" "+props.board?.cards?.length}</span>
            </p>

            <div ref={moreRef} className='board_top_more' onClick={() => setshowDropdown(true)}>
                <MoreHorizontal></MoreHorizontal>
                {
                    showDropdown &&
                    <Dropdown
                    onClose={() => setshowDropdown(false)}
                    parentMore={moreRef}
                    >
                        <div className='board_dropdown'>
                            <p 
                            onClick={(e) => {props.removeBoard(props.board?.id)}}
                            >
                                Delete Board
                            </p>
                        </div>
                    </Dropdown>
                }
            </div>
        </div>

        <div className='cards_container custom-scroll'>
            {
                props.board?.cards?.map((cardItem) => (
                    <Card 
                    key={cardItem.id} 
                    card={cardItem}
                    boardId={props.board?.id}
                    removeCard={props.removeCard}
                    handleDragEnter={props.handleDragEnter}
                    handleDragEnd={props.handleDragEnd}
                    updateCard={props.updateCard}
                    />
                ))
            }
            <Editable
                text="Add Card"
                placeholder="Enter Card Title"
                displayClass="board_cards_add"
                onSubmit={(inputVal) => props.addCard(inputVal, props.board?.id)}
            >
            </Editable>
        </div>

    </div>
  )
}

export default Board