import { exec } from "child_process";
import { writeLog } from "../utils/logs.js";

function execAsync(command) {
  return new Promise((resolve) => {
    if (!command) return resolve("");
    exec(command, (err, stdout, stderr) => {
      if (err) return resolve(`Error: ${err.message}`);
      if (stderr) return resolve(stderr);
      resolve(stdout);
    });
  });
}

export async function runScan(target, commands) {
  const scanId = Date.now();
  const startTime = Date.now();

  writeLog({ event: "scan_started", request_id: scanId, target });

  const results = {
    target,
    host: await execAsync(commands.host),
    whois: await execAsync(commands.whois),
    dig: await execAsync(commands.dig),
    nmap: await execAsync(commands.nmap)
  };

  if (results.nmap) {
    const portLines = results.nmap
      .split("\n")
      .filter(line => /^\d+\/tcp\s+open/.test(line));

    results.openPorts = portLines.map(l => l.split("/")[0]);
    results.otherOpenPorts = results.openPorts.filter(p => p !== "80" && p !== "443");
  }

  results.duration = (Date.now() - startTime) / 1000;

  writeLog({ event: "scan_finished", request_id: scanId, target, duration: results.duration });

  return results;
}
