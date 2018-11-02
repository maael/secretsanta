import React from "react";

const Button: React.SFC<{ text: string }> = ({ text }) => (
  <button>{text}</button>
);

export default Button;
