import { exec } from "child_process";
import { writeLog } from "../utils/logs.js";

export function runScan(target, hostCommand, digCommand, nmapCommand, callback) {
  const results = { target, host: "", dig: "", nmap: "" };
  const scanId = Date.now();
  const startTime = Date.now();

  writeLog({ event: "scan_started", id: scanId, target });

  exec(hostCommand, (err1, stdout1) => {
    results.host = err1 ? `Error: ${err1.message}` : stdout1;

    exec(digCommand, (err2, stdout2) => {
      results.dig = err2 ? `Error: ${err2.message}` : stdout2;

      exec(nmapCommand, (err3, stdout3) => {
        results.nmap = err3 ? `Error: ${err3.message}` : stdout3;
        results.duration = (Date.now() - startTime) / 1000;

        writeLog({ event: "scan_finished", id: scanId, target, duration: results.duration });

        callback(results);
      });
    });
  });
}
