import React from 'react'
import noteContext from "../context/notes/noteContext"
import { useContext } from 'react';

const NoteItem = (props) => {
    const { note , updateNote} = props;

    const context = useContext(noteContext);
    const {deleteNote} = context;


    return (
        <div className='col-md-3'>
            <div className="card my-3">
                <div className="card-body">
                    <div className="d-flex align-items-center">
                        <h5 className="card-title">{note.title}</h5>
                        <i className="fa-solid fa-trash-can mx-2" onClick={() => {deleteNote(note._id); props.showAlert("Deleted Successfully", "success")}}></i>
                        <i className="fa-solid fa-pen-nib mx-2" onClick={() => {
                            updateNote(note);
                        }}></i>
                    </div>
                    <p className="card-text">{note.description}</p>

                </div>
            </div>
        </div>
    )
}

export default NoteItem
