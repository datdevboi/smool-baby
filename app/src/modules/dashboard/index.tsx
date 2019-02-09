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

import { BabyDescription } from "../../components/BabyDescription";
import { BabyModal } from "../../components/BabyModal";
import gql from "graphql-tag";
import { Query } from "react-apollo";
import { host } from "../../client";

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
              <BabyDescription
                imageSrc={`${host}/images/${data.baby.pictureUrl}`}
                babyName={data.baby.name}
                handlePress={this.openModal}
                style={{ flex: 2 }}
              />
            );
          }}
        </Query>

        <View style={styles.listView}>
          <Text>List</Text>
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
    ...Platform.select({
      android: {
        marginTop: StatusBar.currentHeight
      }
    })
  },
  listView: {
    flex: 10,
    backgroundColor: "#f6f1ed"
  }
});
