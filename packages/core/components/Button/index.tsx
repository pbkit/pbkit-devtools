import styles from "./index.module.scss";

export interface ButtonProps extends React.HTMLAttributes<HTMLButtonElement> {}

const Button: React.FC<ButtonProps> = (props) => {
  return (
    <button
      {...props}
      className={`${styles.button} ${props.className ?? ""}`}
    />
  );
};

export default Button;
