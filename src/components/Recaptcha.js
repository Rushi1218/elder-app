// elder-app/src/components/Recaptcha.js
import React, { useEffect } from "react";
import { View } from "react-native";
import { RecaptchaVerifier } from "firebase/auth";
import { auth } from "../services/firebase";

export default function Recaptcha() {
  useEffect(() => {
    if (!window.recaptchaVerifier) {
      window.recaptchaVerifier = new RecaptchaVerifier(
        "recaptcha-container",
        {
          size: "invisible", // or "normal" if you want visible captcha
          callback: (response) => {
            console.log("Recaptcha verified:", response);
          },
        },
        auth
      );
    }
  }, []);

  return <View id="recaptcha-container" />;
}
