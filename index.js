export default async function handler(req, res) {
  const email = req.query.email;

  if (!email) {
    return res.status(400).json({
      success: false,
      message: "Email required"
    });
  }

  try {
    const r = await fetch(`https://api.emailrep.io/${email}`);
    const data = await r.json();

    res.status(200).json({
      success: true,
      email,
      reputation: data.reputation,
      suspicious: data.suspicious,
      details: data.details
    });

  } catch (e) {
    res.status(500).json({
      success: false,
      error: e.message
    });
  }
}
