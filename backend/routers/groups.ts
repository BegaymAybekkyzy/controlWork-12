import express from "express";
import Group from "../models/Group";
import authentication, {RequestWithUser} from "../middleware/authentication";
import {Error} from "mongoose";
import {imagesUpload} from "../middleware/multer";
import GroupUser from "../models/GroupUser";

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
            .populate({path: "author", select: "displayName"})
        res.send(groups);

    } catch (error) {
        next(error);
    }

});

GroupsRouter.get("/:id", async (req, res, next) => {
    try {
        const {id} = req.params;
        const group = await Group.findById(id)
            .populate({path: "author", select: "displayName"});

        const numberOfUsers = await GroupUser.countDocuments({group: id});

        if (!group) {
            res.send({message: "Group not found"});
            return;
        }
        res.send({...group.toObject(), members: numberOfUsers});
    } catch (error) {
        next(error);
    }
});

GroupsRouter.get("/user/:idUser", async (req, res, next) => {
    try {
        const {idUser} = req.params;
        const groups = await Group.find({author: idUser})
            .populate({path: "author", select: "displayName"});

        if (!groups) {
            res.send({message: "Group not found"});
            return;
        }
        res.send(groups);
    } catch (error) {
        next(error);
    }
});

GroupsRouter.delete("/:id", authentication, async (req, res, next) => {
    try {
        const user = (req as RequestWithUser).user;
        const { id } = req.params;
        const deleteGroup = await Group.deleteOne({
            _id: id,
            author: user._id,
        });

        if (deleteGroup.deletedCount === 0 || !deleteGroup) {
             res.status(404).send({ error: "You are not the author or group not found" });
            return
        }

        await GroupUser.deleteMany({group: id});
        res.send({message: "Group has been deleted"});
    } catch (error) {
        next(error)
    }
});

export default GroupsRouter;