import express from "express";
import authentication, {RequestWithUser} from "../middleware/authentication";
import GroupUser from "../models/GroupUser";
import {Error} from "mongoose";
import Group from "../models/Group";

const GroupUserRouter = express.Router();

GroupUserRouter.post("/:idGroup", authentication, async (req, res, next) => {
    try {
        const user = (req as RequestWithUser).user;
        const { idGroup } = req.params;

        const group = await Group.findById(idGroup);
        if (!group) {
             res.status(404).send({ error: "Group not found" });
            return
        }

        if (group.author.toString() === user._id.toString()) {
             res.status(400).send({ error: "The author cannot join the group" });
            return
        }

        const existingUser = await GroupUser.findOne({
            user: user._id,
            group: idGroup,
        });

        if (existingUser) {
             res.status(400).send({ error: "This user is already a member of the group" });
            return
        }

        const addUserToGroup = new GroupUser({
            user: user._id,
            group: idGroup,
        });

        await addUserToGroup.save();
        res.send(addUserToGroup);
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

GroupUserRouter.get("/:idGroup", authentication, async (req, res, next) => {
    try {
        const {idGroup} = req.params;

        const users = await GroupUser
            .find({group: idGroup})
            .populate({path: "user", select: "displayName"});

        res.send(users);
    } catch (error) {
        next(error);
    }
});

GroupUserRouter.delete("/:idGroupUser", authentication, async (req, res, next) => {
    try {
        const user = (req as RequestWithUser).user;
        const {idGroupUser} = req.params;
        const groupUser = await GroupUser.findOne({
            _id: idGroupUser,
        });

        const group = await Group.findOne({author: user._id});

        if (!group) {
            res.status(404).json({error: "You are not the author"});
            return;
        }

        if (!groupUser) {
            res.status(404).json({error: "GroupUser not found"});
            return
        }

        await GroupUser.findByIdAndDelete(idGroupUser);
        res.send({message: "User removed from group"});

    } catch (error) {
        next(error);
    }
});



export default GroupUserRouter;