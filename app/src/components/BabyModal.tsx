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
import { BabyImage } from "./BabyImage";

const OS = Platform.OS;

const ME_QUERY = gql`
  query {
    me {
      email
      babies {
        id
        name
      }
    }
  }
`;

interface Props {
  isOpen: boolean;
  closeModal: () => void;
  goToAddBaby: () => void;
}

export const BabyModal: React.SFC<Props> = ({
  isOpen,
  closeModal,
  goToAddBaby
}) => {
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
              size={45}
              name={OS === "ios" ? "ios-close-circle" : "md-close-circle"}
            />
          </TouchableWithoutFeedback>
        </View>

        <Query query={ME_QUERY}>
          {({ data, loading }) => {
            if (loading) {
              return <Text>Loading..</Text>;
            }

            if (data.me.babies) {
              const Babies = data.me.babies.map((baby: any) => {
                return (
                  <BabyImage
                    key={baby.id}
                    babyName={baby.name}
                    src="https://www.momjunction.com/wp-content/uploads/2014/05/Sweet-Cute-Baby-Girl-Names-With-Meanings.jpg"
                    size={35}
                  />
                );
              });

              return (
                <View style={styles.babies}>
                  {Babies}
                  <TouchableWithoutFeedback onPress={goToAddBaby}>
                    <Ionicons
                      size={35}
                      name={
                        OS === "ios"
                          ? "ios-add-cirlce-outline"
                          : "md-add-circle-outline"
                      }
                    />
                  </TouchableWithoutFeedback>
                </View>
              );
            }
          }}
        </Query>
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

    width: 200
  },
  babies: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start",
    flex: 1
  }
});
