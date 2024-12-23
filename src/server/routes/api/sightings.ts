import express from "express";
import db from "../../db";

const router = express.Router();

router.get("/", async (req, res) => {
    try {
        const sightings = await db.sightings.all();
        res.status(200).json(sightings);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Unexpected server error - can't get all sightings at this time, please try again later" });
    }
});

router.get("/:id", async (req, res) => {
    const id = parseInt(req.params.id);

    if (!id || id < 1) return res.status(400).json({ message: "Not a valid numerical ID" });

    try {
        const [sighting] = await db.sightings.find(id);

        if (!sighting) return res.status(404).json({ message: "No bee sighting was found with that ID" });
        res.status(200).json(sighting);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Unexpected server error - can't get that sighting at this time, please try again later" });
    }
});

router.post("/", async (req, res) => {
    try {
        const { bee_id, observed_at, location, description } = req.body;

        if (!bee_id || !parseInt(bee_id) || parseInt(bee_id) < 1) return res.status(400).json({ message: "Bee ID must bee included and a must bee a positive integer" });
        if (location && typeof location === "string" && location.length > 32) return res.status(400).json({ message: "Location cannot be longer than 32 characters" });
        if (description && typeof description === "string" && description.length > 2048)
            return res.status(400).json({ message: "Description cannot be longer than 2048 characters" });

        // This is hardcoded to Buzz Lightyear for now
        // You must configure this to take its value from the user making the request
        const user_id = 1;

        const results = await db.sightings.create({ bee_id, location, description, observed_at, user_id });
        res.status(200).json({ message: "Successfully created entry for this sighting", id: results.insertId });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Unexpected server error - can't create sighting at this time, please try again later" });
    }
});

router.put("/:id", async (req, res) => {
    try {
        const id = parseInt(req.params.id);

        if (!id || id < 1) return res.status(400).json({ message: "Not a valid numerical ID" });

        const { description } = req.body;

        if (!description || typeof description !== "string" || description.length > 2048)
            return res.status(400).json({ message: "Description cannot be longer than 2,048 characters" });

        // Only potential current checks in place are just making sure I've got a legitimate token
        // I can update your posts, and you can update mine 🤔🤔
        await db.sightings.update(id, description);
        res.status(200).json({ message: "Successfully updated entry for this sighting" });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Unexpected server error - can't update sighting at this time, please try again later" });
    }
});

router.delete("/:id", async (req, res) => {
    try {
        const id = parseInt(req.params.id);

        if (!id || id < 1) return res.status(400).json({ message: "Not a valid numerical ID" });

        // Only potential current checks in place are just making sure I've got a legitimate token
        // I can delete your posts, and you can delete mine 🤔🤔
        await db.sightings.delete(id);
        res.status(200).json({ message: "Successfully deleted that sighting" });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Unexpected server error - can't delete sighting at this time, please try again later" });
    }
});

export default router;
