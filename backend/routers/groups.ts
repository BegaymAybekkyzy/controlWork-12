import express from "express";
import Group from "../models/Group";
import authentication, {RequestWithUser} from "../middleware/authentication";
import {Error} from "mongoose";
import {imagesUpload} from "../middleware/multer";

export const GroupsRouter = express.Router();

GroupsRouter.post("/", authentication, imagesUpload.single("image"), async (req, res, next) => {
    try {
        const user = (req as RequestWithUser).user;
        const {name, description} = req.body;

        const newGroup = new Group({
            author: user._id,
            name,
            image: req.file ? "images/" + req.file.filename : null,
            description,
        });

        await newGroup.save();
        res.send(newGroup);
    } catch (error) {
        if (
            error instanceof Error.ValidationError ||
            error instanceof Error.CastError
        ) {
            res.status(400).send(error);
            return;
        }
        next(error);
    }
});

GroupsRouter.get("/", async (req, res, next) => {
    try {
        const {author} = req.query;
        const filter = author
            ? {author, isPublished: true}
            : {isPublished: true};

        const groups = await Group.find(filter)
            .populate([
                {path: "author", select: "displayName"},
            ])
        res.send(groups);

    } catch (error) {
        next(error);
    }

});

GroupsRouter.get("/:id", async (req, res, next) => {
    try {
        const { id } = req.params;
        const group = await Group.findById(id)
            .populate([
                {path: "author", select: "displayName"},
            ])

        if (!group) {
            res.send({ message: "Group not found" });
            return;
        }
        res.send(group);
    }catch (error) {
        next(error)
    }
});

export default GroupsRouter;