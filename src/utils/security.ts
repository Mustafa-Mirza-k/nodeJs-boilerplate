import CryptoJS from "crypto-js";
import config from "../config";
import bcrypt from "bcrypt";
let encryptedKey = config.ENCRYPTION_KEY || "";
let encryptedIV = config.IV || "";
const secretSpec = getWordArray(encryptedKey);
const ivSpec = getWordArray(encryptedIV);
const saltRounds = 10;

function getUtf8Parse(text: string) {
  return CryptoJS.enc.Utf8.parse(text);
}
function getWordArray(text: string) {
  let parsedText = getUtf8Parse(text);
  return CryptoJS.lib.WordArray.create(parsedText.words);
}

export const encryptData = (plainText: string) => {
  let parsedText = getUtf8Parse(plainText);
  var encrypted = CryptoJS.AES.encrypt(parsedText, secretSpec, { iv: ivSpec });
  return encrypted.toString();
};

export const decryptData = (encryptedText: string) => {
  var decrypted = CryptoJS.AES.decrypt(encryptedText, secretSpec, {
    iv: ivSpec,
  });
  return decrypted.toString(CryptoJS.enc.Utf8);
};

export const hashPassword = (plainText: string): Promise<string> => {
  return new Promise((resolve, reject) => {
    bcrypt.hash(plainText, saltRounds, function (err, hash) {
      if (err) {
        reject(err);
      }
      resolve(hash);
    });
  });
};

export const comparePassword = (
  plainPassword: string,
  hashedPassword: string
): Promise<Boolean | Error> => {
  return new Promise((resolve, reject) => {
    bcrypt.compare(plainPassword, hashedPassword, function (err, result) {
      if (err) {
        reject(err);
      }
      
      resolve(result);
    });
  });
};
