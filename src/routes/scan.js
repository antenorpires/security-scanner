import express from "express";
import { runScan } from "../services/scanExecute.js";
import { sanitizeUrl } from "../utils/sanitize.js";
import { profiles } from "../services/scanProfiles.js";

const router = express.Router();

router.post("/fast", (req, res) => {
  const target = sanitizeUrl(req.body.target || "");
  runScan(target, profiles.fast, res);
});

router.post("/low", (req, res) => {
  const target = sanitizeUrl(req.body.target || "");
  runScan(target, profiles.low, res);
});

export default router;
