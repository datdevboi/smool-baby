import * as React from "react";
import {
  Text,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Platform,
  View
} from "react-native";
import { BlurView } from "expo";
import { Button, Card, Modal } from "react-native-ui-lib";

import { TopBar } from "../../components/TopBar";
import { BabyModal } from "../../components/BabyModal";
import gql from "graphql-tag";
import { Query } from "react-apollo";
import { host } from "../../client";
import { ActionBtn } from "../../components/ActionBtn";
import { CONFIG } from "../../config";

const CURRENT_BABY_QUERY = gql`
  query {
    baby @client {
      name
      id
      pictureUrl
    }
  }
`;

export class DashBoard extends React.Component<any> {
  state = {
    modalOpen: false
  };

  openModal = () => {
    this.setState({
      modalOpen: true
    });
  };

  closeModal = () => {
    this.setState({
      modalOpen: false
    });
  };

  addBaby = () => {
    this.closeModal();

    this.props.navigation.navigate("AddBaby");
  };
  render() {
    return (
      <SafeAreaView style={styles.mainView}>
        <Query
          query={CURRENT_BABY_QUERY}
          onCompleted={data => {
            if (!data.baby.id) {
              // this.setState({
              //   modalOpen: false
              // });
              // this.props.navigation.navigate("AddBaby");
            }
          }}
        >
          {({ loading, data }) => {
            if (loading) {
              return <Text>Loading...</Text>;
            }

            return (
              <TopBar
                imageSrc={`${host}/images/${data.baby.pictureUrl}`}
                babyName={data.baby.name}
                handlePress={this.openModal}
                style={{ flex: 2 }}
                navigation={this.props.navigation}
              />
            );
          }}
        </Query>

        <View style={styles.listView}>
          <View style={{ flex: 1 }}>
            <Text>List</Text>
          </View>

          <ActionBtn />
        </View>

        <BabyModal
          goToAddBaby={this.addBaby}
          isOpen={this.state.modalOpen}
          closeModal={this.closeModal}
        />
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  mainView: {
    display: "flex",
    flex: 1,
    flexDirection: "column",
    ...Platform.select({
      android: {
        marginTop: StatusBar.currentHeight
      }
    })
  },
  listView: {
    flex: 10,
    backgroundColor: CONFIG.colors.AZUREISH_WHITE
  }
});
