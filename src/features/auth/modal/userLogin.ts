import { useState, useEffect } from "react";

export const useLoginForm = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [nameTouched, setNameTouched] = useState(false);
  const [emailTouched, setEmailTouched] = useState(false);
  const [passwordTouched, setPasswordTouched] = useState(false);

  const [isFormValid, setIsFormValid] = useState(false);
  const [errors, setErrors] = useState({
    name: false,
    email: false,
    password: false,
  });

  useEffect(() => {
    const nameValid = name.trim().length >= 3;
    const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    const passwordValid = password.length >= 6;

    setErrors({
      name: !nameValid && nameTouched,
      email: !emailValid && emailTouched,
      password: !passwordValid && passwordTouched,
    });

    setIsFormValid(nameValid && emailValid && passwordValid);
  }, [name, email, password, nameTouched, emailTouched, passwordTouched]);

  return {
    name,
    email,
    password,
    setName,
    setEmail,
    setPassword,
    setNameTouched,
    setEmailTouched,
    setPasswordTouched,
    isFormValid,
    errors,
  };
};
