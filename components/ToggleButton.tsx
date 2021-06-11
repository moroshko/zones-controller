import { MouseEventHandler, ReactNode } from "react";
import styles from "./ToggleButton.module.css";

type Props = {
  isOn: boolean;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  children: ReactNode;
};

export default function ToggleButton({ isOn, onClick, children }: Props) {
  return (
    <button className={styles.button} type="button" onClick={onClick}>
      <span className={styles.name}>{children}</span>
      <span className={styles.status}>{isOn ? "On" : "Off"}</span>
    </button>
  );
}
