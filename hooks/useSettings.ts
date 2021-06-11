import { useRouter } from "next/router";
import { Switches, SwitchId } from "../types/switches";

type LoadingSettings = {
  loading: true;
};

type ValidSettings = {
  loading: false;
  valid: true;
  data: {
    host: string;
    switches: Switches;
  };
};

type InvalidSettings = {
  loading: false;
  valid: false;
  error: string;
};

export default function useSettings():
  | LoadingSettings
  | ValidSettings
  | InvalidSettings {
  const { query, isReady } = useRouter();

  if (!isReady) {
    return {
      loading: true,
    };
  }

  if (Array.isArray(query.host)) {
    return {
      loading: false,
      valid: false,
      error: "Multiple hosts are not allowed",
    };
  }

  const switches: Switches = {};

  for (let k = 1; k <= 8; k++) {
    const dK = `d${k}` as SwitchId;

    if (dK in query) {
      const name = query[dK];

      if (Array.isArray(name)) {
        return {
          loading: false,
          valid: false,
          error: `Multiple d${k} are not allowed`,
        };
      }

      switches[dK] = name;
    }
  }

  return {
    loading: false,
    valid: true,
    data: {
      host: query.host,
      switches,
    },
  };
}
