import React, { useRef, useState } from 'react'
import { CheckSquare, Clock, MoreHorizontal } from 'react-feather';
import Chip from '../Chip/Chip';
import './Card.css';
import Dropdown from '../Dropdown/Dropdown';
import CardDetails from './CardDetails/CardDetails';

export default function Card(props) {

    const [showDropdown, setshowDropdown] = useState(false);
    const cardMoreRef = useRef();
    const [showModal, setShowModal] = useState(false);

    const openCardDetails = (event) => {
        console.log(event.target);
        console.log(cardMoreRef, cardMoreRef.current);
        if (!cardMoreRef.current.contains(event.target)) {
            setShowModal(true);
        }
    }

  return (
    <>
        {
            showModal && 
            <CardDetails 
            card={props.card} 
            onClose={() => setShowModal(false)}
            updateCard={props.updateCard}
            boardId={props.boardId}
            ></CardDetails>
        }
        
        <div 
        className='card'
        draggable
        onDragEnter={() => {props.handleDragEnter(props.card?.id, props.boardId)}}
        onDragEnd={() => {props.handleDragEnd(props.card?.id, props.boardId)}}
        // onClick={(event) => setShowModal(true)}
        onClick={(event) => openCardDetails(event)}
        >   
            <div className='card_top'>
                <div className='card_top_label'>
                    {
                        props.card?.labels?.map((item, index) =>
                        (<Chip key={index} text={item.text} color={item.color}></Chip>)
                        )
                    }
                    {/* <Chip text="Frontend" color="green"></Chip> */}
                </div>

                <div ref={cardMoreRef} className='card_top_more' onClick={() => setshowDropdown(true)}>
                    <MoreHorizontal></MoreHorizontal>
                    {
                        showDropdown &&
                        <Dropdown
                        onClose={() => setshowDropdown(false)}
                        parentMore={cardMoreRef}
                        >
                            <div className='card_dropdown'>
                                <p
                                onClick={(e) => props.removeCard(props.card?.id, props.boardId)}
                                >Delete Card</p>
                            </div>
                        </Dropdown>
                    }
                </div>
            </div>

            <div className='card_title'>
                {props.card?.title}
            </div>

            <div className='card_footer'>
                {props.card?.due_date &&
                    (<p><Clock></Clock>{props.card?.due_date}</p>)
                }

                {
                    props.card?.tasks?.length > 0 
                    &&
                    <p>
                        <CheckSquare/>
                        {props.card?.tasks?.filter((item) => item.completed).length}
                        /
                        {props.card?.tasks?.length}
                    </p>
                    
                }
            </div>
        </div>
    </>
  )
}
