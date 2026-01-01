import express from "express";
import { runScan } from "../services/scan.js";
import { sanitizeUrl } from "../utils/sanitize.js";

const router = express.Router();

router.post("/fast", (req, res) => {
  const target = sanitizeUrl(req.body.target || "");
  runScan(
    target, 
    `sudo proxychains host -d ${target}`, 
    `sudo proxychains dig DNSKEY +dnssec ${target}`, 
    `sudo proxychains nmap -F -Pn -sT --open ${target}`, 
    results => res.json(results)
  );
});

router.post("/low", (req, res) => {
  const target = sanitizeUrl(req.body.target || "");
  runScan(
    target, 
    `sudo proxychains host -d ${target}`, 
    `sudo proxychains dig DNSKEY +dnssec ${target}`, 
    `sudo proxychains nmap -F -Pn -sT --open -sV -A -O --script vuln ${target}`, 
    results => res.json(results)
  );
});

export default router;
