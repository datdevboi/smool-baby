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

const BR = (
  <BlurView tint="light" intensity={50} style={StyleSheet.absoluteFill} />
);
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
  render() {
    return (
      <SafeAreaView style={styles.mainView}>
        <BabyDescription
          imageSrc={
            "https://www.momjunction.com/wp-content/uploads/2014/05/Sweet-Cute-Baby-Girl-Names-With-Meanings.jpg"
          }
          babyName={"Ivy"}
          handlePress={this.openModal}
          style={{ flex: 2 }}
        />
        <View style={styles.listView}>
          <Text>List</Text>
        </View>

        <Modal
          visible={this.state.modalOpen}
          onRequestClose={this.closeModal}
          transparent={true}
          animationType="slide"
        >
          <BlurView
            tint="light"
            intensity={100}
            style={styles.modalViewContainer}
          >
            <View>
              <Button onPress={this.closeModal}>
                <Text>Close modal</Text>
              </Button>
            </View>
          </BlurView>
        </Modal>
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
  },
  modalViewContainer: {
    height: 100,
    justifyContent: "center",
    alignItems: "center",
    width: 100
  }
});
