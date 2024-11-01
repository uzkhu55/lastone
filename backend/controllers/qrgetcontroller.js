import User from "../models/userModel.js";
import qrcode from "qrcode";

export const qrcontroller = async (req, res) => {
  const { url } = req.body;
  try {
    const qrurl = await qrcode.toDataURL(url);
    return qrurl;
  } catch (error) {
    console.log("error qr");
  }
};
