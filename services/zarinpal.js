const configs = require("../configs");
const { default: axios } = require("axios");

const zarinpal = axios.create({
  baseURL: configs.zarinpal.baseUrl,
});

exports.createPeyment = async function ({ amoutInRial, description }) {
  try {
    const response = await zarinpal.post("/request.json", {
      merchant_id: configs.zarinpal.merchantID,
      callback_url: configs.zarinpal.callbackUrl,
      amount: amoutInRial,
      description,
    });

    const data = response.data.data;

    return {
      authority: data.authority,
      paymentUrl: configs.zarinpal.startPayment + data.authority,
    };
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
};
