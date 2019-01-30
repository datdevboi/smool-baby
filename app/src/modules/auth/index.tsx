import * as React from "react";

import { LoaderScreen } from "react-native-ui-lib";
import { SecureStore } from "expo";

export class AuthLoadingScreen extends React.Component<any> {
  constructor(props) {
    super(props);

    this._bootstrapAsync();
  }

  _bootstrapAsync = async () => {
    const userToken = await SecureStore.getItemAsync("sid");

    this.props.navigation.navigate(userToken ? "Main" : "Login");
  };
  render() {
    return <LoaderScreen loaderColor="blue" message="Loading..." />;
  }
}
