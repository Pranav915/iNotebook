import React from "react";
import NoteContext from "./noteContext";
import { useState } from "react";

const NoteState = (props) => {
  const host = "https://i-notebook915.herokuapp.com";
  // const host = "http://localhost:5000";
  const notesInitial = [];
  const token = localStorage.getItem("token");
  console.log(token);

  const [notes, setNotes] = useState(notesInitial);

  // Get all notes
  const getNotes = async () => {
    // ToDo API Call
    const url = `${host}/api/notes/fetchallnotes`;
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "text/plain",
        "auth-token": token,
      },
    });
    const json = await response.json();
    setNotes(json);
  };

  // Add a note
  const addNote = async (title, description, tag) => {
    // ToDo API Call

    const response = await fetch(`${host}/api/notes/addnote`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token": token,
      },
      body: JSON.stringify({
        title: title[0],
        description: description[0],
        tag: tag[0],
      }),
    });
    console.log(title, description, tag);
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
        "auth-token": token,
      },
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
        "auth-token": token,
      },
      body: JSON.stringify({ title, description, tag }),
    });
    const json = await response.json();
    console.log(json);

    let newNotes = JSON.parse(JSON.stringify(notes));
    for (let index = 0; index < newNotes.length; index++) {
      const element = newNotes[index];
      if (element._id === id) {
        newNotes[index].title = title;
        newNotes[index].description = description;
        newNotes[index].tag = tag;
        break;
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
