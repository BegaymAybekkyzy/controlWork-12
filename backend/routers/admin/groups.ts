import express from "express";
import authentication from "../../middleware/authentication";
import Group from "../../models/Group";
import GroupUser from "../../models/GroupUser";
import {Error} from "mongoose";

const GroupsAdminRouter = express.Router();

GroupsAdminRouter.patch("/:id", async (req, res, next) => {
    try {
        const { id } = req.params;
        const group = await Group.findById(id);

        if (!group) {
            res.status(404).send({ error: "Not Found artist" });
            return;
        }

        const updateGroup = await Group.findByIdAndUpdate(
            id,
            { isPublished: !group.isPublished },
            { new: true },
        );
        res.send(updateGroup);
    } catch (err) {
        if (
            err instanceof Error.ValidationError ||
            err instanceof Error.CastError
        ) {
            res.status(400).send(err);
            return;
        }
        next(err);
    }
});

GroupsAdminRouter.delete("/:id", authentication, async (req, res, next) => {
    try {
        const { id } = req.params;
        const deleteGroup = await Group.deleteOne({_id: id,});

        if (deleteGroup.deletedCount === 0) {
            res.status(404).send({ error: "Group not found" });
            return
        }

        await GroupUser.deleteMany({group: id});
        res.send({message: "Group has been deleted"});
    } catch (error) {
        next(error)
    }
});

export default GroupsAdminRouter