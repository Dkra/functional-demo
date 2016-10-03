'use strict';

var util = require('util');
var express = require('express');
var router = express.Router();
var path  = require('path');
var notes = require(process.env.NOTES_MODEL
                   ? path.join('..', process.env.NOTES_MODEL)
                   : '../models/notes-memory');

router.get('/', function(req, res, next) {
  notes.keylist()
  .then(keylist => {
      var keyPromises = [];
      for (var key of keylist) {
          keyPromises.push(
              notes.read(key)
              .then(note => {
                  return { key: note.key, title: note.title };
              })
          );
      }
      return Promise.all(keyPromises);
  })
  .then(notelist => {
    res.render('note/index', { title: 'Notes', notelist: notelist });
  })
  .catch(err => { next(err); });
});

// Add Note
router.get('/add', (req, res, next) => {
    res.render('note/noteedit', {
        title: "Add a Note",
        docreate: true,
        notekey: "",
        note: undefined
    });
});

// Save
router.post('/save', (req, res, next) => {
    var p;
    if (req.body.docreate === "create") {
        p = notes.create(req.body.notekey,
                req.body.title, req.body.body);
    } else {
        p = notes.update(req.body.notekey,
                req.body.title, req.body.body);
    }
    p.then(note => {
        res.redirect('/note/view?key='+ req.body.notekey);
    })
    .catch(err => { next(err); });
});

// Read
router.get('/view', (req, res, next) => {
    notes.read(req.query.key)
    .then(note => {
        res.render('note/noteview', {
            title: note ? note.title : "",
            notekey: req.query.key,
            note: note
        });
    })
    .catch(err => { next(err); });
});

// Edit
router.get('/edit', (req, res, next) => {
    notes.read(req.query.key)
    .then(note => {
        res.render('note/noteedit', {
            title: note ? ("Edit " + note.title) : "Add a Note",
            docreate: false,
            notekey: req.query.key,
            note: note
        });
    })
    .catch(err => { next(err); });
});

// Delete
router.get('/destroy', (req, res, next) => {
    notes.read(req.query.key)
    .then(note => {
        res.render('note/notedestroy', {
            title: note ? note.title : "",
            notekey: req.query.key,
            note: note
        });
    })
    .catch(err => { next(err); });
});

router.post('/destroy/confirm', (req, res, next) => {
    notes.destroy(req.body.notekey)
    .then(() => { res.redirect('/note'); })
    .catch(err => { next(err); });
});

module.exports = router;
