const request = require("request");
const configs = require("../configs");
const axios = require("axios");

const patternCodeID = 2962;

exports.sendSms = async (phone, otp) => {
  const patternValues = ["کاربر عزیز", otp];
  try {
    const response = await axios.post(
      "https://portal.amootsms.com/rest/SendWithPattern",
      {
        Mobile:phone,
        PatternCodeID: patternCodeID.toString(),
        PatternValues: patternValues.join(","),
      },
      { headers: { Authorization: configs.optToken ,
        "Content-Type": "application/x-www-form-urlencoded",
      } }
    );
    const json = response.data;
    console.log(json);
  } catch (error) {
    console.error("Error sending OTP:", error);
  }
};
