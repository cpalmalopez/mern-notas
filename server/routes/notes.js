const express = require('express');
const router = express.Router();

const Note = require('../models/note');

const saveNote = (note, res) => {
    note
        .save()
        .then(note => res.json(note))
        .catch(() => res.status(400).json({msg: "Error: No se pudo guardar la nota."}));
}

router.get("/", (req, res) => {
    Note.find({ author: req.username.username })
        .then(notes => {
            res.json(notes);
        }).catch(err => res.json({msg: "No se pudo encontrar las notas del usuario."}));
});

router.post("/", (req, res) => {
    const { title, body, videoLink, videoTimestamp } = req.body;
    let note = new Note({
        title,
        body: JSON.parse(body),
        author: req.username.username,
        videoLink,
        videoTimestamp
    });

    saveNote(note, res);
});

router.put("/:id", (req, res) => {
    const { title, body, videoLink, videoTimestamp } = req.body;
    Note
        .findById(req.params.id)
        .then(note => {
            note.title = title;
            note.body = JSON.parse(body);
            note.videoLink = videoLink;
            note.videoTimestamp = videoTimestamp;
            saveNote(note, res);
        }).catch(() => res.json({msg: "No se pudo encontrar una nota con este ID"}));
});

router.delete("/:id", (req, res) => {
    Note
        .findByIdAndDelete(req.params.id)
        .then(() => res.json({msg: "Nota eliminada"}))
        .catch(() => res.json({msg: "No se pudo eliminar la nota."}))
})

module.exports = router;