export default async function handler(req, res) {
  res.setHeader("Cache-Control", "no-store");
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ status: false, message: "Method not allowed" });
  }
  try {
    const body = typeof req.body === "string" ? JSON.parse(req.body) : (req.body || {});
    const teks = typeof body.teks === "string" ? body.teks.trim() : "";
    const requestedModel = typeof body.model === "string" ? body.model.toLowerCase() : "chatgpt";
    const allowedModels = new Set(["chatgpt", "gemini", "claude"]);
    const model = allowedModels.has(requestedModel) ? requestedModel : "chatgpt";
    const session = typeof body.session === "string" ? body.session.slice(0, 120) : "nova-web";
    if (!teks) return res.status(400).json({ status: false, message: "Pesan tidak boleh kosong." });
    if (teks.length > 8000) return res.status(413).json({ status: false, message: "Pesan terlalu panjang (maksimal 8000 karakter)." });
    const url = new URL("https://api.zyvor.my.id/api/ai/chatai");
    url.searchParams.set("teks", teks);
    url.searchParams.set("model", model);
    url.searchParams.set("session", session);
    url.searchParams.set("stream", "false");
    const upstream = await fetch(url, { headers: { Accept: "application/json" }, signal: AbortSignal.timeout(30000) });
    const raw = await upstream.text();
    let data;
    try { data = JSON.parse(raw); } catch { data = { status: false, message: "API memberikan respons tidak valid." }; }
    return res.status(upstream.ok ? 200 : upstream.status).json(data);
  } catch (error) {
    const timedOut = error && error.name === "TimeoutError";
    return res.status(timedOut ? 504 : 502).json({ status: false, message: timedOut ? "API terlalu lama merespons. Coba lagi." : "Tidak dapat menghubungi layanan AI." });
  }
}
