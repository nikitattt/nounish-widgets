import express from "express";
import controller from "../controllers/nouns";
const router = express.Router();

router.get("/nouns", controller.getNounsData);

export = router;
