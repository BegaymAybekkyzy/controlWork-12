import mongoose from "mongoose";
import config from "./config";
import User from "./models/User";
import Group from "./models/Group";
import GroupUser from "./models/GroupUser";

const run = async () => {
    await mongoose.connect(config.db);
    const db = mongoose.connection;

    try {
        await db.dropCollection("users");
        await db.dropCollection("groups");
        await db.dropCollection("groupusers");
    }catch (error) {
        console.log("Collections were not present, skipping drop");
    }

    const bob = new User({
        email: "bob@gmail.com",
        displayName: "Bob",
        password: "111",
        role: "user",
    });

    bob.generateToken();
    await bob.save();

    const fox = new User({
        email: "fox@gmail.com",
        displayName: "Fox",
        password: "111",
        role: "user",
    });

    fox.generateToken();
    await fox.save();

    const testUser1 = new User({
        email: "testUser1@gmail.com",
        displayName: "testUser1",
        password: "111",
        role: "user",
    });

    testUser1.generateToken();
    await testUser1.save();

    const testUser2 = new User({
        email: "testUser2@gmail.com",
        displayName: "testUser2",
        password: "111",
        role: "user",
    });

    testUser2.generateToken();
    await testUser2.save();

    const alice = new User({
        email: "alice@gmail.com",
        displayName: "Alice",
        password: "111",
        role: "admin",
    });

    alice.generateToken();
    await alice.save();

    const [group1, group2] = await Group.create(
        {
            author: bob._id,
            name: "Yoga by Bob",
            image: "images/1de7ad7d-af4a-4a87-9bb8-cd6b5ba4d19a.png",
            description: "Ipsum quam, vestibulum et consectetur adipiscing sit elit. Mattis eleifend malesuada lorem amet, faucibus. Hac non orci, leo, lectus dolor habitasse et consectetur amet amet vulputate molestie orci, sodales lacini.",
            isPublished: true,
        },
        {
            author: bob._id,
            name: "Yoga by Bob",
            image: "images/1de7ad7d-af4a-4a87-9bb8-cd6b5ba4d19a.png",
            description: "Ipsum quam, vestibulum et consectetur adipiscing sit elit. Mattis eleifend malesuada lorem amet, faucibus. Hac non orci, leo, lectus dolor habitasse et consectetur amet amet vulputate molestie orci, sodales lacini.",
            isPublished: true,
        },
        {
            author: alice._id,
            name: "Yoga by Alice",
            image: "images/1de7ad7d-af4a-4a87-9bb8-cd6b5ba4d19a.png",
            description: "Ipsum quam, vestibulum et consectetur adipiscing sit elit. Mattis eleifend malesuada lorem amet, faucibus. Hac non orci, leo, lectus dolor habitasse et consectetur amet amet vulputate molestie orci, sodales lacini.",
            isPublished: true,
        },
        {
            author: fox._id,
            name: "Yoga by Fox",
            image: "images/1de7ad7d-af4a-4a87-9bb8-cd6b5ba4d19a.png",
            description: "Ipsum quam, vestibulum et consectetur adipiscing sit elit. Mattis eleifend malesuada lorem amet, faucibus. Hac non orci, leo, lectus dolor habitasse et consectetur amet amet vulputate molestie orci, sodales lacini.",
            isPublished: true,
        },
    );

    await GroupUser.create(
        {
            user: testUser1._id,
            group: group1._id,
        },

        {
            user: testUser2._id,
            group: group1._id,
        },
        {
            user: testUser2._id,
            group: group2._id,
        },

        {
            user: testUser1._id,
            group: group1._id,
        },

        {
            user: alice._id,
            group: group1._id,
        },

        {
            user: fox._id,
            group: group2._id,
        }
    );

    await db.close();
}

run().catch(console.error);