import React, { useRef, useState } from "react";
import {
  SafeAreaView,
  View,
  Dimensions,
  PanResponder,
  Animated,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { makeStyles } from "./style";
import { globalSpacingStyle } from "../../../constants/space/style";
import { MainHeader, Text } from "../../../components";
import { FlashList } from "@shopify/flash-list";
import { AttachIcon, SendButtonIcon } from "../../../assets";
import DocumentPicker from "react-native-document-picker";
const styles = makeStyles();
const globalStyle = globalSpacingStyle();
const { width, height } = Dimensions.get("window");

export default function Chat() {
  const pan = useRef(new Animated.ValueXY()).current;
  const [messages, setMessages] = useState([
    { id: "1", text: "Salam size nece komek ede bilerik", user: "other" },
    { id: "2", text: "Yessss", user: "me" },
  ]);
  const [newMessage, setNewMessage] = useState("");
  const flashListRef = useRef(null);
  const sendMessage = () => {
    if (newMessage.trim().length > 0) {
      setMessages((previousMessages) => [
        ...previousMessages,
        { id: Date.now().toString(), text: newMessage, user: "me" },
      ]);
      setNewMessage("");
      flashListRef.current?.scrollToEnd({ animated: true });
    }
  };
  const renderItem = ({ item }) => (
    <View style={[item.user === "me" ? styles.myMessage : styles.otherMessage]}>
      <Text size="16" text={item.text} type="regular" isWhite />
    </View>
  );
  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderGrant: () => {
        pan.setOffset({
          x: pan.x._value,
          y: pan.y._value,
        });
        pan.setValue({ x: 0, y: 0 });
      },
      onPanResponderMove: Animated.event([null, { dx: pan.x, dy: pan.y }], {
        useNativeDriver: false,
      }),
      onPanResponderRelease: () => {
        pan.flattenOffset();
      },
    })
  ).current;
  const handleFileSelect = async () => {
    try {
      const res = await DocumentPicker.pick({
        type: [DocumentPicker.types.allFiles],
      });
      setMessages((previousMessages) => [
        ...previousMessages,
        {
          id: Date.now().toString(),
          text: `Dosya Gönderildi: ${res[0].name}`,
          user: "me",
        },
      ]);
      flashListRef.current?.scrollToEnd({ animated: true });
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
        console.log("Kullanıcı iptal etti.");
      } else {
        console.error("Hata:", err);
      }
    }
  };
  return (
    <SafeAreaView style={styles.safeArea}>
      <MainHeader />
      <View style={styles.container}>
        <View style={styles.content}>
          <FlashList
            ref={flashListRef}
            data={messages}
            renderItem={renderItem}
            keyExtractor={(item) => item.id}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.messagesContainer}
            estimatedItemSize={50}
          />
          <View style={styles.inputBox}>
            <TextInput
              value={newMessage}
              onChangeText={setNewMessage}
              placeholder="   Send Message"
              placeholderTextColor={"#8A8B8B"}
              style={styles.textInput}
              multiline={true}
              textAlignVertical="center"
            />
            <TouchableOpacity
              hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
              onPress={handleFileSelect}
            >
              <AttachIcon />
            </TouchableOpacity>
            <View style={globalStyle.space10HR} />
            <TouchableOpacity style={styles.button} onPress={sendMessage}>
              <SendButtonIcon />
            </TouchableOpacity>
          </View>
        </View>

        <Animated.View
          {...panResponder.panHandlers}
          style={[
            styles.draggableBox,
            {
              transform: [{ translateX: pan.x }, { translateY: pan.y }],
            },
          ]}
        >
          <Text text="Video!" type="regular" size="16" position="center" />
        </Animated.View>
      </View>
    </SafeAreaView>
  );
}
