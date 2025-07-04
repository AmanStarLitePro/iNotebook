const express = require('express');
const Note = require('../models/Note');
const router = express.Router()
const fetchUser = require('../middleware/fetchUser');
const { body, validationResult } = require('express-validator');

// ROUTE 1 : Get All the Notes using: POST "/api/notes/getuser.  Login Required".
router.get('/fetchallnotes', fetchUser, async (req, res) => {
    try {
        const notes = await Note.find({ user: req.user.id });
        res.json(notes)
    } catch (error) {
        console.error("Error creating user:", error);
        res.status(500).json({ error: 'Internal server error', details: error.message }); // Include error details
    }
})

// ROUTE 2 : Add a New Notes using: POST "/api/notes/addnote".  Login Required".
router.post('/addnote', fetchUser, [
    body('title', 'Enter a valid title').isLength({ min: 3 }),
    body('description', 'Description must be at least 5 characters').isLength({ min: 5 }),
], async (req, res) => {
    try {
        const { title, description, tag } = req.body;
        // If there is no errors, return bad request and the errors
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const note = new Note({
            title, description, tag, user: req.user.id
        })
        const saveNote = await note.save()

        res.json(saveNote)
    } catch (error) {
        console.error("Error creating user:", error);
        res.status(500).json({ error: 'Internal server error', details: error.message }); // Include error details
    }

})

// ROUTE 3 : Update an existing Note using: PUT "/api/notes/updatenote".  Login Required".
router.put('/updatenote/:id', fetchUser, async (req, res) => {
    const { title, description, tag } = req.body;

    try {
        // Create a New Note Object
        const newNote = {};
        if (title) { newNote.title = title };
        if (description) { newNote.description = description };
        if (tag) { newNote.tag = tag };

        // Find the note to be updated and update it
        let note = await Note.findById(req.params.id);
        if (!note) {
            return res.status(406).send("Note Found");
        }

        // Allow Updation only if user own this Note
        if (note.user.toString() !== req.user.id) {
            return res.status(401).send("Not Allowed");
        }

        note = await Note.findByIdAndUpdate(req.params.id, { $set: newNote }, { new: true })
        res.json({ note });
    } catch (error) {
        console.error("Error updating user:", error);
        res.status(500).json({ error: 'Internal server error', details: error.message }); // Include error details
    }


})

// ROUTE 4 : Delete an existing Note using: DELETE "/api/notes/deletenote".  Login Required".
router.delete('/deletenote/:id', fetchUser, async (req, res) => {

    try {
        // Find the note to be updated and delete it
        let note = await Note.findById(req.params.id);
        if (!note) {
            return res.status(406).send("Not Found");
        }

        // Allow deletion only if user own this Note
        if (note.user.toString() !== req.user.id) {
            return res.status(401).send("Not Allowed");
        }

        note = await Note.findByIdAndDelete(req.params.id)
        res.json({ "Success": "Note has been Deleted", note: note });
    } catch (error) {
        console.error("Error deleting user:", error);
        res.status(500).json({ error: 'Internal server error', details: error.message }); // Include error details
    }

})

module.exports = router