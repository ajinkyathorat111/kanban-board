import React, { useState, useEffect } from 'react';
import { Calendar, CheckSquare, List, Tag, Trash, Type } from 'react-feather';
import Modal from '../../Modal/Modal';
import "./CardDetails.css";
import Editable from '../../Editable/Editable';
import Chip from '../../Chip/Chip';

export default function CardDetails(props) {

    const colors = [
        "#a8193d",
        "#4fcc25",
        "#1ebffa",
        "#8da377",
        "#9975bd",
        "#cf61a1",
        "#240959",
      ];

    const [activeColor, setActiveColor] = useState("");

    // const {title, description, due_date, labels, tasks} = props.card;

    const [cardDetails, setCardDetails] = useState(props.card);

    useEffect(() => {
        props.updateCard(cardDetails.id, props.boardId, cardDetails);

    }, [cardDetails])
    

    const tasksProgress = () => {
        if (cardDetails.tasks?.length === 0) {
            return "0%";
        }
        const completed = cardDetails.tasks.filter(task => (task.completed))?.length;

        return (completed/cardDetails.tasks.length)*100 + "%";
    }

    const addLabel = (value) => {
        setCardDetails({
            ...cardDetails,
            labels: [...cardDetails.labels, {
                id: Date.now() + Math.random() * 3,
                text: value,
                color: activeColor
            }]
        })
    }

    const removeLabel = (labelId) => {
        let newLabels = cardDetails.labels.filter(label => label.id !== labelId);
        setCardDetails({...cardDetails, labels: newLabels});
    }

    const addTask = (value) => {
        setCardDetails({
            ...cardDetails,
            tasks: [...cardDetails.tasks, 
            {
                id: Date.now() + Math.random() * 3,
                text: value,
                completed: false
            }]
        })
    }

    const removeTask = (taskId) => {
        let newTasks = cardDetails.tasks.filter(task => task.id !== taskId);
        setCardDetails({...cardDetails, tasks: newTasks});
    }

    const updateTask = (taskId, completed) => {
        let taskInd = cardDetails.tasks?.findIndex(task => task.id === taskId);
        if (taskInd < 0) return;

        let tempTasks = [...cardDetails.tasks];
        tempTasks[taskInd].completed = completed;
        setCardDetails({...cardDetails, tasks: tempTasks});
    }

  return (
    <Modal 
    onClose={() => props.onClose()}
    >
        <div className='carddetails'>
            <div className='carddetails_box'>
                <div className='carddetails_box_title'>
                    <Type></Type>
                    Title
                </div>
                <div className='carddetails_box_body'>
                    <Editable
                    text={cardDetails.title || "Add title"}
                    placeholder={"Enter title"}
                    buttonText={"Add Title"}
                    onSubmit={(value) => (setCardDetails({...cardDetails, title: value}))}
                    ></Editable>
                </div>
            </div>

            <div className='carddetails_box'>
                <div className='carddetails_box_title'>
                    <List></List>
                    Description
                </div>
                <div className='carddetails_box_body'>
                    <Editable
                    text={cardDetails.description || "Add description"}
                    placeholder={"Enter description"}
                    buttonText={"Add Description"}
                    onSubmit={(value) => (setCardDetails({...cardDetails, description: value}))}
                    ></Editable>
                </div>
            </div>

            <div className='carddetails_box'>
                <div className='carddetails_box_title'>
                    <Calendar></Calendar>
                    Date
                </div>
                <div className='carddetails_box_body'>
                    <input type="date" 
                    defaultValue={cardDetails.due_date ? new Date(cardDetails.due_date).toISOString().substring(0,10) : ""}
                    // value={due_date || ""}
                    onChange={(e)=> setCardDetails({...cardDetails, due_date: e.target.value})}
                    ></input>
                </div>
            </div>

            <div className='carddetails_box'>
                <div className='carddetails_box_title'>
                    <Tag></Tag>
                    Labels
                </div>
                <div className='carddetails_box_labels'>
                    {
                        cardDetails.labels?.map((label, index) => (
                            <Chip 
                            key={index} 
                            close
                            onClose={() => {removeLabel(label.id)}}
                            text={label.text}
                            color={label.color}
                            ></Chip>
                        ))
                    }
                </div>
                <div className='carddetails_box_colors'>
                    {
                        colors.map((item, index) => (
                            <li 
                            className={item === activeColor ? "active" : ""} 
                            onClick={() => setActiveColor(item)}
                            key={index} 
                            style={{backgroundColor: item}}
                            />
                        ))
                    }
                </div>
                <div className='carddetails_box_body'>
                    <Editable
                    text={"Label name"}
                    placeholder={"Enter label"}
                    buttonText={"Add Label"}
                    onSubmit={(value) => {addLabel(value)}}
                    ></Editable>
                </div>
            </div>

            <div className='carddetails_box'>
                <div className='carddetails_box_title'>
                    <CheckSquare></CheckSquare>
                    Tasks
                </div>
                <div className='carddetails_box_progressbar'>
                    <div 
                    className='carddetails_box_progress' 
                    style={{width: tasksProgress(),
                            backgroundColor: tasksProgress() == "100%" ? "limegreen" : ""}}
                    />
                </div>
                <div className='carddetails_box_tasklist'>
                    {
                        cardDetails.tasks?.map((task, index) => 
                            <div key={task.id} className='carddetails_box_task'>
                                <input 
                                type="checkbox"
                                // defaultValue={task.completed}
                                checked={task.completed}
                                onChange={(e) => updateTask(task.id, e.target.checked)}
                                ></input>
                                <p>{task.text}</p>
                                <Trash onClick={() => removeTask(task.id)}></Trash>
                            </div>
                        )
                    }
                </div>
                <div className='carddetails_box_body'>
                    <Editable
                    text={"Add new task"}
                    placeholder={"Enter task"}
                    buttonText={"Add Task"}
                    onSubmit={(value) => addTask(value)}
                    ></Editable>
                </div>
            </div>
        </div>

    </Modal>
  )
}
