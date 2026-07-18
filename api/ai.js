// وسيط الذكاء الاصطناعي — بيحمي مفتاح الـ API وبيحدد الاستخدام
// المفتاح بيتحط في إعدادات Vercel باسم ANTHROPIC_API_KEY (مش هنا أبدًا!)

// حد استخدام بسيط لكل زائر: 10 طلبات كل ساعة (تقدري تغيري الرقمين دول)
const LIMIT = 10;
const WINDOW_MS = 60 * 60 * 1000;
const hits = new Map();

function rateLimited(ip) {
  const now = Date.now();
  const rec = hits.get(ip) || { count: 0, start: now };
  if (now - rec.start > WINDOW_MS) {
    rec.count = 0;
    rec.start = now;
  }
  rec.count += 1;
  hits.set(ip, rec);
  return rec.count > LIMIT;
}

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: { message: "Method not allowed" } });
  }
  if (!process.env.ANTHROPIC_API_KEY) {
    return res.status(500).json({ error: { message: "ANTHROPIC_API_KEY is not configured" } });
  }

  const ip = (req.headers["x-forwarded-for"] || "unknown").split(",")[0].trim();
  if (rateLimited(ip)) {
    return res.status(429).json({
      content: [{ type: "text", text: "وصلتي للحد المجاني للساعة دي 🤍 ارجعيلي كمان شوية، أو اشتركي في النسخة الكاملة قريبًا!" }],
    });
  }

  try {
    const { system, messages, max_tokens } = req.body || {};
    if (!Array.isArray(messages) || messages.length === 0) {
      return res.status(400).json({ error: { message: "messages is required" } });
    }

    const upstream = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": process.env.ANTHROPIC_API_KEY,
        "anthropic-version": "2023-06-01",
      },
      body: JSON.stringify({
        model: "claude-sonnet-4-6",
        max_tokens: Math.min(Number(max_tokens) || 1000, 3000),
        system: typeof system === "string" ? system.slice(0, 4000) : undefined,
        messages: messages.slice(-20).map((m) => ({
          role: m.role === "assistant" ? "assistant" : "user",
          content: String(m.content).slice(0, 4000),
        })),
      }),
    });

    const data = await upstream.json();
    return res.status(upstream.ok ? 200 : upstream.status).json(data);
  } catch (e) {
    return res.status(500).json({ error: { message: "Upstream request failed" } });
  }
}
