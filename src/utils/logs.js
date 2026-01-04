export function writeLog(entry) {
  console.log(JSON.stringify({
    timestamp: new Date().toISOString(),
    ...entry
  }));
}
