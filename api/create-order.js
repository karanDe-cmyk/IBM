const axios = require("axios");

module.exports = async (req, res) => {
  if (req.method !== "POST") {
    return res.status(405).send("Method Not Allowed");
  }

  const { phone, amount, order_id, email, note } = req.body;

  try {
    const response = await axios.post(
      "https://pay.imb.org.in/api/create-order",
      new URLSearchParams({
        customer_mobile: phone,
        user_token: "dc0d21ce8211b2d79415c095254826be",
        amount,
        order_id,
        redirect_url: "https://pay.imb.org.in",
        remark1: email,
        remark2: note,
      }),
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );

    res.status(200).json(response.data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to create order" });
  }
};
