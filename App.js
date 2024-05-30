
import React from "react";
import {AppContainer} from "./src/navigation";
import {StatusBar, View} from "react-native";

export default function App() {

  return (
    <React.Fragment>
      <StatusBar hidden />
      <AppContainer />
    </React.Fragment>
  );
}
