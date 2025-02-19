import { useState } from "react";
import css from "./PasswordInput.module.css";
import { FiEyeOff } from "react-icons/fi";
import { GoEye } from "react-icons/go";

const PasswordInput = (props) => {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword((prevState) => !prevState);
  };

  return (
    <div className={css.container}>
      <input type={showPassword ? "text" : "password"} {...props} />
      <span onClick={togglePasswordVisibility} className={css.icon}>
        {showPassword ? <GoEye size={20} /> : <FiEyeOff size={20} />}
      </span>
    </div>
  );
};

export default PasswordInput;
