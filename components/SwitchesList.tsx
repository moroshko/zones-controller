import { useState /*, useEffect*/ } from "react";
import ToggleButton from "./ToggleButton";
import { Switches, SwitchId } from "../types/switches";
import styles from "./SwitchesList.module.css";

type State =
  | {
      loading: true;
    }
  | {
      loading: false;
      error?: string;
    };

type Props = {
  host: string;
  switches: Switches;
};

export default function SwitchesList({ host, switches }: Props) {
  const [state, setState] = useState<State>({
    loading: true,
  });

  // useEffect(() => {
  //   const eventSource = new EventSource(`http://${host}/events`);

  //   eventSource.onerror = (event) => {
  //     console.log(eventSource);
  //     setState({
  //       loading: false,
  //       error: `Failed to connect to: ${event.target.url}`,
  //     });
  //   };

  //   function handleStateMessage(event) {
  //     console.log(event);
  //   }

  //   eventSource.addEventListener("state", handleStateMessage);

  //   return () => {
  //     eventSource.removeEventListener("state", handleStateMessage);
  //     eventSource.close();
  //   };
  // }, []);

  if (state.loading) {
    return (
      <div className={styles.message} role="alert">
        Connecting...
      </div>
    );
  }

  if (!state.loading && state.error) {
    return (
      <div className={styles.message} role="alert">
        {state.error}
      </div>
    );
  }

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
