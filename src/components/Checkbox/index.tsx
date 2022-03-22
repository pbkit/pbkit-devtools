import React from "react";
import styles from "./index.module.scss";

interface CheckboxProps {
  isChecked: boolean;
  onChange(value: boolean): void;
  children?: React.ReactNode;
  className?: string;
}
const Checkbox: React.FC<CheckboxProps> = ({
  isChecked,
  onChange,
  children,
  ...props
}) => {
  return (
    <label {...props} className={`${styles.checkbox} ${props.className ?? ""}`}>
      <input
        type="checkbox"
        checked={isChecked}
        onChange={(e) => onChange(e.currentTarget.checked)}
      />
      {children}
    </label>
  );
};

export default React.memo(Checkbox);
