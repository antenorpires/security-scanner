import express from "express";
import { runScan } from "../services/scan.js";
import { sanitizeUrl } from "../utils/sanitize.js";

const router = express.Router();

router.post("/fast", (req, res) => {
  const target = sanitizeUrl(req.body.target || "");
  runScan(
    target, 
    `proxychains host -d ${target}`, 
    `proxychains dig DNSKEY +dnssec ${target}`, 
    `proxychains nmap -F -Pn -sT --open ${target}`, 
    results => res.json(results)
  );
});

router.post("/low", (req, res) => {
  const target = sanitizeUrl(req.body.target || "");
  runScan(
    target, 
    `proxychains host -d ${target}`, 
    `proxychains dig DNSKEY +dnssec ${target}`, 
    `proxychains nmap -F -Pn -sT -A ${target}`, 
    results => res.json(results)
  );
});

export default router;
