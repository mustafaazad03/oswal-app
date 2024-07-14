import React from "react";
import { WebView } from "react-native-webview";
export const MapComponent = () => {
  return (
    <WebView
      scalesPageToFit={true}
      bounces={false}
      javaScriptEnabled
      style={{ height: 500, width: 300 }}
      source={{
        html: `
            <!DOCTYPE html>
            <html>
              <head></head> // <--add header styles if needed
              <body>
                <div id="baseDiv">${iframeString}</div> //<--- add your iframe here
              </body>
            </html>
      `,
      }}
      automaticallyAdjustContentInsets={false}
    />
  );
};
