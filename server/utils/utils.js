import crypto from "crypto";
const generateFileName = (bytes = 16) => {
  const randomBytes = crypto.randomBytes(bytes);
  return randomBytes.toString("base64").slice(0, 22).replace(/\+/g, "-").replace(/\//g, "_");
};

export { generateFileName };
