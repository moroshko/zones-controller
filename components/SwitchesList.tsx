import ToggleButton from "./ToggleButton";
import { Switches, SwitchId } from "../types/switches";
import styles from "./SwitchesList.module.css";

type Props = {
  switches: Switches;
};

export default function SwitchesList({ switches }: Props) {
  return (
    <ul className={styles.list}>
      {Object.keys(switches).map((id) => (
        <li key={id}>
          <ToggleButton isOn={false}>{switches[id as SwitchId]}</ToggleButton>
        </li>
      ))}
    </ul>
  );
}
