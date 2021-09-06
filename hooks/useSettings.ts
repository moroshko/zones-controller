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
      error: "Multiple hosts are not allowed.",
    };
  }

  const switches: Switches = {};

  for (let k = 1; k <= 8; k++) {
    const zoneK = `zone_${k}` as SwitchId;

    if (zoneK in query) {
      const name = query[zoneK];

      if (Array.isArray(name)) {
        return {
          loading: false,
          valid: false,
          error: `Multiple zone_${k} are not allowed.`,
        };
      }

      switches[zoneK] = name;
    }
  }

  if (Object.keys(switches).length === 0) {
    return {
      loading: false,
      valid: false,
      error: "Please provide at least one zone.",
    };
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
