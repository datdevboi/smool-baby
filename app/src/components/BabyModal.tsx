import * as React from "react";
import {
  View,
  Text,
  StyleSheet,
  Platform,
  TouchableWithoutFeedback,
  Alert
} from "react-native";
import { BlurView } from "expo";
import { Query } from "react-apollo";
import gql from "graphql-tag";
import { Modal, Button } from "react-native-ui-lib";
import { Ionicons } from "@expo/vector-icons";

const OS = Platform.OS;

const ME_QUERY = gql`
  query {
    me {
      email
      babies {
        name
      }
    }
  }
`;

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
        <View style={styles.closeView}>
          <TouchableWithoutFeedback onPress={closeModal}>
            <Ionicons
              size={25}
              name={OS === "ios" ? "ios-close-circle" : "md-close-circle"}
            />
          </TouchableWithoutFeedback>
        </View>

        <View>
          <Query query={ME_QUERY}>
            {({ data, loading }) => {
              if (loading) {
                return <Text>Loading..</Text>;
              }

              return <Text>{data.me.email}</Text>;
            }}
          </Query>
          <View>
            <Ionicons
              name={
                OS === "ios"
                  ? "ios-add-cirlce-outline"
                  : "md-add-circle-outline"
              }
            />
          </View>
        </View>
      </BlurView>
    </Modal>
  );
};

const styles = StyleSheet.create({
  closeView: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-end"
  },
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
