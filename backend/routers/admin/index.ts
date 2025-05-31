import express from "express";
import authentication from "../../middleware/authentication";
import permit from "../../middleware/permit";
import GroupsAdminRouter from "./groups";

const adminRouter = express.Router();

adminRouter.use(authentication, permit("admin"));
adminRouter.use("/groups", GroupsAdminRouter);

export default adminRouter;
