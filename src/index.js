import React from "react";
import ReactDOM from "react-dom";
import bridge from "@vkontakte/vk-bridge";
import App from "./App";

// Init VK  Mini App
bridge.send("VKWebAppInit");
start()

bridge.subscribe(({ detail: { type, data } }) => {
  if (type === 'VKWebAppUpdateConfig') {
    const schemeAttribute = document.createAttribute('scheme');
    let isLight = data.scheme.includes("light");
    let scheme = data.scheme;
    if (bridge.supports('VKWebAppSetViewSettings')) {
      bridge.send('VKWebAppSetViewSettings', {
        'status_bar_style': isLight ? 'dark' : 'light',
        'action_bar_color': isLight ? '#fff' : '#191919'
      });
    }
    if (!scheme.includes("light")) {
      document.documentElement.style.backgroundColor = "#19191a";
    }
    schemeAttribute.value = scheme;
    document.body.attributes.setNamedItem(schemeAttribute);
  }
});



function start() {
  ReactDOM.render(<App />, document.getElementById("root"));
}