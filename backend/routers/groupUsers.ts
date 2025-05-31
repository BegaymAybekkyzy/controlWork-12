import express from "express";
import authentication, {RequestWithUser} from "../middleware/authentication";
import GroupUser from "../models/GroupUser";
import {Error} from "mongoose";

const GroupUserRouter = express.Router();

GroupUserRouter.post("/", authentication, async (req, res, next) => {
    try {
        const user = (req as RequestWithUser).user;
        const existingUser = await GroupUser.findOne({
            user: user._id,
            group: req.body.group,
        });

        if (existingUser) {
            res
                .status(400)
                .send({error: "This user is already a member of the group"});
            return;
        }

        const addUserToGroup = new GroupUser({
            user: user._id,
            group: req.body.group,
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

GroupUserRouter.get("/:id", authentication, async (req, res, next) => {
    try {
        const {id} = req.params;

        const users = await GroupUser
            .find({group: id})
            .populate({path: "user", select: "displayName"});

        res.send(users);
    } catch (error) {
        next(error);
    }
});

GroupUserRouter.delete("/:id", authentication, async (req, res, next) => {
    try {
        const user = (req as RequestWithUser).user;
        const {id} = req.params;
        const groupUser = await GroupUser.findOne({
            _id: id,
        }).populate({
            path: 'group',
            match: {author: user._id},
        });

        if (!groupUser) {
            res.status(404).json({error: "GroupUser not found or you are not the author"});
            return
        }

        // await GroupUser.findByIdAndDelete(id);
        console.log(groupUser);

        res.send({message: "User removed from group"});

    } catch (error) {
        next(error);
    }
});



export default GroupUserRouter;