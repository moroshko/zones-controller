import useSettings from "../hooks/useSettings";
import SwitchesList from "../components/SwitchesList";

const IndexPage = () => {
  const settings = useSettings();

  if (settings.loading) {
    return null;
  }

  console.log(JSON.stringify(settings, null, 2));

  return (
    <main>
      {settings.valid ? (
        <SwitchesList switches={settings.data.switches} />
      ) : (
        <div role="alert">{settings.error}</div>
      )}
    </main>
  );
};

IndexPage.pageTitle = "Zones Controller";
IndexPage.pageDescription =
  "Zones Controller allows you to easily control your air conditioner or heater using your mobile device.";

export default IndexPage;
