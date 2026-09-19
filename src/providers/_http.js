async function fetchJSON(url, options) {
  if (typeof fetch !== "function") throw new Error("Node.js 18+ is required.");
  const response = await fetch(url, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(options.headers || {})
    }
  });

  const text = await response.text();
  let data;
  try { data = JSON.parse(text); }
  catch { data = { raw: text }; }

  if (!response.ok) {
    const detail = data?.error?.message || data?.message || data?.raw || response.statusText;
    throw new Error(`API request failed (${response.status}): ${detail}`);
  }
  return data;
}

module.exports = { fetchJSON };