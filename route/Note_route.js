const express = require('express');
const user_controler = require('../controller/User_controller');
const notes_controler = require('../controller/Notes_controller');
const upload = require('../middleware/multer')
const vrifytoken = require('../middleware/verifyToken')


const router = express.Router()

router.route('/getMyNotes')
    .get(vrifytoken, notes_controler.get_my_notes);

router.route('/AddNotes')
    .post(vrifytoken, notes_controler.add_notes);

router.route('/updateMyNote/:NoteId')
    .patch(vrifytoken, notes_controler.update_my_note);

router.route('/deleteMyNote/:NoteId')
    .delete(vrifytoken, notes_controler.delete_my_note);



module.exports = router;