// elder-app/src/screens/LoginScreen.js
import React, { useState } from "react";
import { View, Text, TextInput, Button } from "react-native";
import { auth } from "../services/firebase";
import { PhoneAuthProvider, signInWithCredential } from "firebase/auth";

export default function LoginScreen() {
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [verificationId, setVerificationId] = useState(null);

  // Step 1: Send OTP
  const sendOtp = async () => {
    try {
      const provider = new PhoneAuthProvider(auth);
      const id = await provider.verifyPhoneNumber(phone, window.recaptchaVerifier);
      setVerificationId(id);
      alert("OTP sent!");
    } catch (error) {
      console.error(error);
      alert("Error sending OTP");
    }
  };

  // Step 2: Verify OTP
  const verifyOtp = async () => {
    try {
      const credential = PhoneAuthProvider.credential(verificationId, otp);
      await signInWithCredential(auth, credential);
      alert("Login successful!");
    } catch (error) {
      console.error(error);
      alert("Invalid OTP");
    }
  };

  return (
    <View style={{ padding: 20 }}>
      <Text>Enter Phone Number:</Text>
      <TextInput
        value={phone}
        onChangeText={setPhone}
        placeholder="+91XXXXXXXXXX"
        style={{ borderWidth: 1, marginBottom: 10 }}
      />
      <Button title="Send OTP" onPress={sendOtp} />

      <Text>Enter OTP:</Text>
      <TextInput
        value={otp}
        onChangeText={setOtp}
        placeholder="123456"
        style={{ borderWidth: 1, marginBottom: 10 }}
      />
      <Button title="Verify OTP" onPress={verifyOtp} />
    </View>
  );
}
