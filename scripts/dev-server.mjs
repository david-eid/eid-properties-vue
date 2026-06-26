import { spawn } from "node:child_process";
import net from "node:net";

const HOST = "localhost";
const BASE_PORT = 5173;
const MAX_PORT = 5199;
const VITE_SIGNATURE = "/@vite/client";

function get(url) {
  return new Promise((resolve) => {
    const request = fetch(url, { signal: AbortSignal.timeout(1200) })
      .then(async (response) => {
        resolve({
          ok: true,
          status: response.status,
          text: await response.text(),
        });
      })
      .catch(() => {
        resolve({ ok: false, status: 0, text: "" });
      });

    return request;
  });
}

async function isViteRunning(port) {
  const response = await get(`http://${HOST}:${port}/`);
  return response.ok && response.text.includes(VITE_SIGNATURE);
}

function isPortFree(port) {
  return new Promise((resolve) => {
    const server = net.createServer();

    server.once("error", () => resolve(false));
    server.once("listening", () => {
      server.close(() => resolve(true));
    });
    server.listen(port, HOST);
  });
}

async function findAvailablePort(startPort) {
  for (let port = startPort; port <= MAX_PORT; port += 1) {
    if (await isPortFree(port)) {
      return port;
    }
  }

  throw new Error(`No available dev server port found between ${startPort} and ${MAX_PORT}.`);
}

function runVite(port) {
  const viteBin = process.platform === "win32" ? "vite.cmd" : "vite";
  const child = spawn(viteBin, ["--host", HOST, "--port", String(port), "--strictPort"], {
    cwd: process.cwd(),
    stdio: "inherit",
    shell: true,
  });

  child.on("exit", (code, signal) => {
    if (signal) {
      process.kill(process.pid, signal);
      return;
    }

    process.exit(code ?? 0);
  });
}

if (await isViteRunning(BASE_PORT)) {
  console.log(`Vite is already running at http://${HOST}:${BASE_PORT}`);
  process.exit(0);
}

const port = await findAvailablePort(BASE_PORT);

if (port !== BASE_PORT) {
  console.log(`Port ${BASE_PORT} is in use by another application. Starting Vite at http://${HOST}:${port}`);
}

runVite(port);
