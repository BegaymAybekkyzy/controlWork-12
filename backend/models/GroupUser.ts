import mongoose, {Schema, Types} from "mongoose";
import User from "./User";
import Group from "./Group";

const GroupUserSchema = new mongoose.Schema({
    user: {
        ref: "User",
        required: true,
        type: Schema.Types.ObjectId,
        validate: {
            validator: async (value: Types.ObjectId) => {
                const user = await User.findById(value);
                return !!user;
            },
            message: "User not found",
        },
    },
    group: {
        ref: "Group",
        required: true,
        type: Schema.Types.ObjectId,
        validate: {
            validator: async (value: Types.ObjectId) => {
                const group = await Group.findById(value);
                return !!group;
            },
            message: "Group not found",
        },
    }
});

const GroupUser = mongoose.model("GroupUser", GroupUserSchema);
export default GroupUser;