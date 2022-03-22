import styles from "./index.module.scss";

type Icon = "filter" | "search" | "clear";

export interface IconButtonProps
  extends Omit<React.HTMLAttributes<HTMLButtonElement>, "children"> {
  icon: Icon;
  isActive?: boolean;
}

const IconButton: React.FC<IconButtonProps> = ({
  icon,
  isActive,
  ...props
}) => {
  return (
    <button
      {...props}
      className={`${styles["icon-button"]} ${props.className ?? ""}`}
    >
      <span
        className={`${styles.icon} ${styles[icon]} ${
          isActive ? styles.active : ""
        }`}
      ></span>
    </button>
  );
};

export default IconButton;
