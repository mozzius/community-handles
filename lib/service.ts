export const verifyReCaptcha = async (token: string) => {
  const secretKey = process.env.RECAPTCHA_SECRET_KEY

  const response = await fetch(
    `https://www.google.com/recaptcha/api/siteverify`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: `secret=${secretKey}&response=${token}`,
    }
  )

  const data = await response.json()
  let success = data.success && data.score > 0.5
  return success
}
