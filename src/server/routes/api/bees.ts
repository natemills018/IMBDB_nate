import express from "express";
import db from "../../db";

const router = express.Router();

router.get("/", async (req, res) => {
    try {
        const bees = await db.bees.all();
        res.status(200).json(bees);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Unexpected server error - can't get all bees at this time, please try again later" });
    }
});

export default router;
