import * as React from "react";
import { View, Text, StyleSheet } from "react-native";
import { BlurView } from "expo";
import { Modal, Button } from "react-native-ui-lib";

interface Props {
  isOpen: boolean;
  closeModal: () => void;
}

export const BabyModal: React.SFC<Props> = ({ isOpen, closeModal }) => {
  return (
    <Modal
      visible={isOpen}
      onRequestClose={closeModal}
      transparent={true}
      animationType="slide"
    >
      <BlurView tint="light" intensity={80} style={styles.modalViewContainer}>
        <View>
          <Button onPress={closeModal}>
            <Text>Close modal</Text>
          </Button>
        </View>
      </BlurView>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalViewContainer: {
    alignSelf: "center",
    marginTop: "auto",
    marginBottom: "auto",
    height: 200,
    // justifyContent: "center",
    // alignItems: "center",
    width: 200
  }
});
