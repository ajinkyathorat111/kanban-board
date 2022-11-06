import React, { useEffect, useState } from "react";
import './App.css';
import Board from "./Components/Board/Board";
import Editable from "./Components/Editable/Editable";

function App() {

  // const [boards, setBoards] = useState(
  //                             [
  //                               {
  //                                 id: Date.now() + Math.random(),
  //                                 title: "To Do",
  //                                 cards: [
  //                                   {
  //                                     id: Date.now() + Math.random() * 2,
  //                                     title: "Card 1",
  //                                     description: "First sample card",
  //                                     tasks: [
  //                                       {
  //                                         id: Date.now() + Math.random() * 4,
  //                                         text: "Fix board apis",
  //                                         completed: false
  //                                       },
  //                                       {
  //                                         id: Date.now() + Math.random() * 4,
  //                                         text: "Develop card apis",
  //                                         completed: false
  //                                       }
  //                                     ],
  //                                     labels: [
  //                                       {
  //                                         id: Date.now() + Math.random() * 3,
  //                                         text: "frontend",
  //                                         color: "#4fcc25"
  //                                       }
  //                                     ],
  //                                     due_date: "2022/09/29"
  //                                   },
  //                                   {
  //                                     id: Date.now() + Math.random() * 2,
  //                                     title: "Card 2",
  //                                     description: "Second sample card",
  //                                     tasks: [
  //                                       {
  //                                         id: Date.now() + Math.random() * 4,
  //                                         text: "Test board apis",
  //                                         completed: false
  //                                       },
  //                                       {
  //                                         id: Date.now() + Math.random() * 4,
  //                                         text: "Design apis",
  //                                         completed: true
  //                                       }
  //                                     ],
  //                                     labels: [
  //                                       {
  //                                         id: Date.now() + Math.random() * 3,
  //                                         text: "sample",
  //                                         color: "#1ebffa"
  //                                       }
  //                                     ],
  //                                     due_date: "2022/09/22"
  //                                   }
  //                                 ]
  //                               }
  //                             ]
  //                           );

  const [boards, setBoards] = useState(JSON.parse(localStorage.getItem("kanban")) || []);

  const [target, setTarget] = useState({
    cardId: "",
    boardId: ""
  });
  
  const addCard = (title, boardId) => {
    const newCard = {
      id: Date.now() + Math.random() * 2,
      title,
      description: "",
      tasks: [],
      labels: [],
      due_date: ""
    };
    const index = boards.findIndex(item => item.id === boardId);
    if (index > -1) {
      const tempBoards = [...boards];
      tempBoards[index].cards.push(newCard);
      setBoards(tempBoards);
    }

  }

  const removeCard = (cardId, boardId) => {
    const boardIndex = boards.findIndex(item => item.id === boardId);
    if (boardIndex < 0) {
      return;
    }
    const cardIndex = boards[boardIndex].cards.findIndex(item => item.id === cardId);
    if (cardIndex < 0) {
      return;
    }
    const tempBoards = [...boards];
    tempBoards[boardIndex].cards.splice(cardIndex,1);
    setBoards(tempBoards);
  }

  const addBoard = (title) => {
    setBoards([...boards, {
      id: Date.now() + Math.random() * 2,
      title,
      cards: []
    }]);
  }

  const removeBoard = (boardId) => {
    const boardIndex = boards.findIndex(item => item.id === boardId);
    if (boardIndex < 0) {
      return;
    }
    const tempBoards = [...boards];
    tempBoards.splice(boardIndex,1);
    setBoards(tempBoards);
  }

  const handleDragEnter = (cardId, boardId) => {
    setTarget({
      cardId,
      boardId
    });
  }

  const handleDragEnd = (cardId, boardId) => {
    let sourceCardInd, sourceBoardInd, targetCardInd, targetBoardInd;

    sourceBoardInd = boards.findIndex(item => item.id === boardId);
    if (sourceBoardInd < 0) {
      return;
    }
    sourceCardInd = boards[sourceBoardInd].cards.findIndex(item => item.id === cardId);
    if (sourceCardInd < 0) {
      return;
    }

    targetBoardInd = boards.findIndex(item => item.id === target.boardId);
    if (targetBoardInd < 0) {
      return;
    }
    targetCardInd = boards[targetBoardInd].cards.findIndex(item => item.id === target.cardId);
    if (targetCardInd < 0) {
      return;
    }

    const tempBoards = [...boards]
    const tempCard = tempBoards[sourceBoardInd].cards[sourceCardInd];
    tempBoards[sourceBoardInd].cards.splice(sourceCardInd, 1);
    tempBoards[targetBoardInd].cards.splice(targetBoardInd, 0, tempCard);
    setBoards(tempBoards);
  }

  const updateCard = (cardId, boardId, updatedCard) => {
    const boardIndex = boards.findIndex(item => item.id === boardId);
    if (boardIndex < 0) {
      return;
    }
    const cardIndex = boards[boardIndex].cards.findIndex(item => item.id === cardId);
    if (cardIndex < 0) {
      return;
    }

    const tempBoards = [...boards];
    tempBoards[boardIndex].cards[cardIndex] = updatedCard;
    setBoards(tempBoards);
  }

  useEffect(() => {
    localStorage.setItem("kanban", JSON.stringify(boards));
  }, [boards])
  

  return (
    <div className="app">
      <div className="app_navbar">
        <h2>Kanban</h2>
      </div>
      <div className="board_outer">

        <div className="board_container">
          {/* {console.log(boards)} */}
          { 
            boards?.length > 0 &&
            boards.map((item) => 
            <Board 
            key={item.id} 
            board={item}
            removeBoard={removeBoard}
            addCard={addCard}
            removeCard={removeCard}
            handleDragEnter={handleDragEnter}
            handleDragEnd={handleDragEnd}
            updateCard={updateCard}
            />
            )
          }

          <div className="add_board_editable">
            <Editable
            displayClass="add_board_add_display"
            text="Add Board"
            placeholder="Enter board title"
            onSubmit={(inputValue) => addBoard(inputValue)}
            ></Editable>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
