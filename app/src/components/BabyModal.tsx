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
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp
} from "react-native-responsive-screen";
import { Query } from "react-apollo";
import gql from "graphql-tag";
import { Modal, Button } from "react-native-ui-lib";
import { Ionicons } from "@expo/vector-icons";
import { BabyImage } from "./BabyImage";
import { host } from "../client";
import { TouchableOpacity } from "react-native-ui-lib";
import { ChangeBaby } from "./ChangeBaby";

const OS = Platform.OS;

const ME_QUERY = gql`
  query {
    me {
      email
      babies {
        id
        name
        pictureUrl
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
                  <ChangeBaby key={baby.id}>
                    {({ mutate }) => (
                      <TouchableOpacity
                        onPress={async () => {
                          await mutate({
                            variables: {
                              name: baby.name,
                              babyId: baby.id,
                              pictureUrl: baby.pictureUrl
                            }
                          });
                        }}
                      >
                        <BabyImage
                          babyName={baby.name}
                          src={`${host}/images/${baby.pictureUrl}`}
                          size={35}
                        />
                      </TouchableOpacity>
                    )}
                  </ChangeBaby>
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
                          ? "ios-add-circle-outline"
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
    height: hp("40%"),

    width: wp("45%")
  },
  babies: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-evenly",
    flex: 1
  }
});
