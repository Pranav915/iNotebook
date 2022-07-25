import React from "react";
import NoteContext from "./noteContext";
import { useState } from "react";

const NoteState = (props) => {
  const host = 'http://localhost:5000';
  const notesInitial = [];

  const [notes, setNotes] = useState(notesInitial);

  // Get all notes
  const getNotes = async () => {
    // ToDo API Call
    const url = `${host}/api/notes/fetchallnotes`;
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": 'text/plain',
        "auth-token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjI0ZjIxNDQ2NTgzMTc1MWFjODM1MGVmIn0sImlhdCI6MTY0OTM1MzAyOH0.HAMvdNTbGlzR_venGBzhldWk2ChGjvPEtx5XQLVYSbY"}
    });
    const json = await response.json();
    setNotes(json);
  };

  // Add a note
  const addNote = async (title,description,tag) => {
    // ToDo API Call
   
    const response = await fetch("http://localhost:5000/api/notes/addnote", {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
        "auth-token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjI0ZjIxNDQ2NTgzMTc1MWFjODM1MGVmIn0sImlhdCI6MTY0OTM1MzAyOH0.HAMvdNTbGlzR_venGBzhldWk2ChGjvPEtx5XQLVYSbY",
      },
      body: JSON.stringify({"title":title[0] , "description":description[0] , "tag":tag[0]}),
    })
    console.log(title , description , tag);
    // console.log(response);
    
  };

  // Delete a note
  const deleteNote = async (id) => {
    // ToDo API Call
    const url = `${host}/api/notes/deletenote/${id}`;
    const response = await fetch(url, {
      method: "DELETE", 
      headers: {
        "Content-Type": "application/json",
        "auth-token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjI0ZjIxNDQ2NTgzMTc1MWFjODM1MGVmIn0sImlhdCI6MTY0OTM1MzAyOH0.HAMvdNTbGlzR_venGBzhldWk2ChGjvPEtx5XQLVYSbY",
      }
    });
    const json = await response.json();

    setNotes((prevNotes) => {
      return prevNotes.filter((note) => {
        return note._id !== id;
      });
    });
  };

  // Edit a note
  const editNote = async (id, title, description, tag) => {
    const url = `${host}/api/notes/updatenote/${id}`;
    const response = await fetch(url, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjI0ZjIxNDQ2NTgzMTc1MWFjODM1MGVmIn0sImlhdCI6MTY0OTM1MzAyOH0.HAMvdNTbGlzR_venGBzhldWk2ChGjvPEtx5XQLVYSbY",
      },
      body: JSON.stringify(title, description, tag),
    });
    const json = await response.json();
    for (let index = 0; index < notes.length; index++) {
      const element = notes[index];
      if (element._id === id) {
        element.title = title;
        element.description = description;
        element.tag = tag;
      }
    }
  };

  return (
    <NoteContext.Provider
      value={{ notes, setNotes, editNote, deleteNote, addNote, getNotes }}
    >
      {props.children};
    </NoteContext.Provider>
  );
};

export default NoteState;
