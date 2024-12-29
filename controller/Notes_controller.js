const Notes = require('../models/Note_Schema');
const Users = require('../models/Users_Schema');
const http_status = require('../utils/http_status');
const AppError = require('../utils/AppError');

const AsyncWrapper = require('../middleware/asyncWrapper');

const add_notes = AsyncWrapper(
    async (req, res, next) => {
        try {
            const { title, contains } = req.body;
            const user = await Users.findOne({ email: req.user.email }).exec();
            
            if (!user) {
                return res.status(404).json({
                    status: http_status.NOT_FOUND,
                    message: "User not found",
                });
            }

            const note = new Notes({
                title,
                contains,
                user_id: user._id,
            });

            await note.save();

            res.status(201).json({
                status: http_status.SUCCESS,
                message: "Note added successfully",
                data: note
            });
        } catch (error) {
            next(error);
        }
    }
);



const get_my_notes = AsyncWrapper(
    async (req, res, next) => {
        try {
            const user = req.user;
            if (!user || !user.id) {
                return res.status(400).json({
                    status: http_status.FAILURE,
                    message: "User information is missing or invalid."
                });
            }

            const notes = await Notes.find({ user_id: user.id });

            res.status(200).json({
                status: http_status.SUCCESS,
                data: notes
            });
        } catch (error) {
            next(error);
        }
    }
);

const update_my_note = AsyncWrapper(
    async (req, res, next) => {
        const user = req.user;
        const note_id = req.params.NoteId;
        const { title, contains } = req.body;
        const note = await Notes.findOne({ _id: note_id,user_id: user.id });
        if (!note) {
            return next(new AppError("Note not found", http_status.FAIL));
        }
        note.updatedAt = Date.now();
        note.title = title ? title : note.title;
        note.contains = contains ? contains : note.contains;
        await note.save();
        res.status(200).json({
            status: http_status.SUCCESS,
            message: "Note updated successfully",
            data: note
        });
    }
)

const delete_my_note = AsyncWrapper(
    async (req, res, next) => {
        const user = req.user;
        const note_id = req.params.NoteId;

        const note = await Notes.findOneAndDelete({ _id: note_id, user_id: user.id });

        if (!note) {
            return next(new AppError("Note not found", http_status.FAIL));
        }

        res.status(200).json({
            status: http_status.SUCCESS,
            message: "Note deleted successfully"
        });
    }
);

    

module.exports = {
    get_my_notes,
    add_notes,
    update_my_note,
    delete_my_note
}