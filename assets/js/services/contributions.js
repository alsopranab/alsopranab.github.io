import { CONFIG } from "../core/config.js";

export async function fetchContributions() {
  const res = await fetch(
    `https://github-contributions-api.jogruber.de/v4/${CONFIG.github.username}`
  );
  const data = await res.json();
  return data.contributions;
}
