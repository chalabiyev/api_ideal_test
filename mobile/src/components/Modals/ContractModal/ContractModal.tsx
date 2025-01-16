import React, { useState } from "react";
import { ScrollView, TouchableOpacity, View, Image } from "react-native";
import { makeStyles } from "./style";
import { ConnectionModalProps } from "./type";
import Modal from "react-native-modalbox";
import Text from "../../Fit/Text";
import { useNavigation } from "@react-navigation/native";
import MainButton from "../../Fit/Button";
import { globalSpacingStyle } from "../../../constants/space/style";

const globalStyle = globalSpacingStyle();
const styles = makeStyles();

export default function ContractModal(
  props: ConnectionModalProps
): JSX.Element {
  const { setState, state } = props;
  const navigation = useNavigation();

  const handleSignWithSima = () => {
    setState(false);
    setTimeout(() => {
      navigation.navigate("VideoCall", { showGif: true });
    }, 300);
  };

  const handleClose = () => {
    setState(false);
  };

  return (
    <Modal
      useNativeDriver
      style={styles.modal}
      swipeToClose={false}
      isOpen={state}
      swipeThreshold={1}
      onClosed={() => setState && setState(false)}
      coverScreen={true}
      position={"center"}
    >
      <View style={styles.container}>
        <View style={globalStyle.space10VT} />
        <Text
          text="Kredit Müqaviləsi"
          type="regular"
          size="18"
          position="center"
        />
        <View style={globalStyle.space10VT} />

        <ScrollView
          contentContainerStyle={{
            paddingBottom: 50,
          }}
          showsVerticalScrollIndicator={false}
        >
          <Text
            text="Kredit müqaviləsi, borcalan ilə kredit verən qurum (məsələn, bank və ya maliyyə təşkilatı) arasında bağlanan rəsmi sənəddir. Bu müqavilə vasitəsilə kredit verən, müəyyən faiz və şərtlər əsasında borcalana pul vəsaiti təqdim edir. Müqavilədə kreditin məbləği, ödəniş müddəti, faiz dərəcəsi, cərimə şərtləri, eləcə də tərəflərin hüquq və öhdəlikləri açıq şəkildə qeyd olunur. Borcalan, aldığı vəsaiti müqavilədə göstərilən vaxt çərçivəsində geri ödəmək və faizləri vaxtında təmin etmək öhdəliyini daşıyır. Kredit müqaviləsi, mübahisə və anlaşılmazlıqların qarşısını almaq, maliyyə əməliyyatlarının şəffaf və hüquqi əsaslarla tənzimlənməsi üçün vacib sənəddir."
            type="regular"
            size="14"
            position="center"
          />
          <View style={globalStyle.space30VT} />
          <MainButton
            text="Sima imza ilə imzala"
            onPress={handleSignWithSima}
          />
          <View style={globalStyle.space20VT} />
          <TouchableOpacity onPress={handleClose}>
            <Text
              text="Ləğv et"
              type="regular"
              size="14"
              position="center"
              isBlue
            />
          </TouchableOpacity>
        </ScrollView>
        <View style={globalStyle.space10VT} />
      </View>
    </Modal>
  );
}
