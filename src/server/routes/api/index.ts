import express from "express";
import beeRouter from "./bees";
import sightingsRouter from "./sightings";

const router = express.Router();

router.use("/bees", beeRouter);
router.use("/sightings", sightingsRouter);

export default router;
