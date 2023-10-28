import fetch from "node-fetch";
import { sha256 } from "js-sha256";
const saltKey = "19c2208c-9248-4526-983e-247a5e3422b6";

export const createSession = async (req, res) => {
  const test_payload = {
    merchantId: "PATIENTONLINE",
    merchantTransactionId: req.body.merchantTransactionId,
    merchantUserId: req.body.merchantUserId,
    amount: parseInt(req.body.amount) * 100,
    redirectUrl: "https://www.patientcare247.com/payResponse",
    redirectMode: "REDIRECT",
    callbackUrl: "https://www.patientcare247.com/payResponse",
    mobileNumber: req.body.phone,
    paymentInstrument: {
      type: "PAY_PAGE",
    },
  };

  const payload = Buffer.from(JSON.stringify(test_payload)).toString('base64')
  const X_VERIFY = sha256(payload + "/pg/v1/pay" + saltKey) + "###1";
  const url = "https://api.phonepe.com/apis/hermes/pg/v1/pay";
  const headers = {
    "Content-Type": "application/json",
    "X-VERIFY": X_VERIFY,
  };
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: headers,
      body: JSON.stringify({
        request: payload,
      }),
    });
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response}`);
    }
    else{
      const responseData = await response.json();
      res.status(200).send(responseData.data);
    }
  } catch (error) {
     res.status(401).send(`Unauthorized ${error}`);
  }
};

export const updateSession = async (req, res) => {
  const merchantId ="PATIENTONLINE";
  const merchantTransactionId = req.body.merchantTransactionId;
  const X_VERIFY = sha256(`/pg/v1/status/${merchantId}/${merchantTransactionId}` + saltKey) + "###1";
  const url = `https://api.phonepe.com/apis/hermes/pg/v1/status/${merchantId}/${merchantTransactionId}`;
  const headers = {
    "Content-Type": "application/json",
    "X-VERIFY": X_VERIFY,
    'X-MERCHANT-ID' : merchantId
  };
  try {
    const response = await fetch(url, {
      method: "GET",
      headers: headers,
    });
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    else{
      const responseData = await response.json();
      res.status(200).send(responseData);
    }
  } catch (error) {
    res.status(401).send("Unauthorized");
  }
};
