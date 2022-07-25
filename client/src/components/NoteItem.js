import React, { useContext } from "react";
import noteContext from "../context/notes/noteContext";


export const NoteItem = (props) => {
  const { note , updateNote} = props;

  const context = useContext(noteContext)
  const {deleteNote} = context;

  return (
    <div className="col-md-3">
      <div className="card my-3">
        <div className="card-body">
          <h4 className="card-title">{note.title}</h4>
          <p className="card-text">{note.description}</p>
          <div>
          <i onClick={()=>{deleteNote(note._id)}} className="fa-solid fa-trash-can mx-2"></i>
          <i onClick={()=>{updateNote(note)}} className="fa-solid fa-pen-to-square mx-2"></i>
          </div>
        </div>
      </div>
    </div>
  );
};
