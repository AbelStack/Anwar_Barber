export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" })
  }

  const { botToken, chatId, text } = req.body

  if (!botToken || !chatId || !text) {
    return res.status(400).json({ error: "Missing required fields" })
  }

  try {
    const telegramRes = await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: chatId,
        text,
        parse_mode: "Markdown"
      }),
    })

    const data = await telegramRes.json()
    res.status(200).json(data)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}
