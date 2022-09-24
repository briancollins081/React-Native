import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, Button, View, Alert, Platform } from 'react-native';
import * as Notifications from 'expo-notifications';
import { useEffect } from 'react';

Notifications.setNotificationHandler({
  handleNotification: async () => {
    return {
      shouldPlaySound: false,
      shouldSetBadge: false,
      shouldShowAlert: true
    }
  }
});

export default function App() {

  useEffect(() => {
    const configNotification = async () => {
      let deviceStatus
      const { status } = await Notifications.getPermissionsAsync();
      deviceStatus = status
      if (status != "granted") {
        const { status } = await Notifications.requestPermissionsAsync()
        deviceStatus = status
      }
      if (deviceStatus != "granted") {
        Alert.alert("Missing permissions!", "Push notifications need appropriate permissions!")
        return
      }

      const tokenData = await Notifications.getExpoPushTokenAsync();
      console.log(tokenData);

      if (Platform.OS === "android") {
        await Notifications.setNotificationChannelAsync("default", {
          name: "default",
          importance: Notifications.AndroidImportance.DEFAULT
        })
      }
    }
    configNotification()
  }, [])


  useEffect(() => {
    const subscription1 = Notifications.addNotificationReceivedListener(notification => {
      console.log("Notification Received!");
      console.log(notification.request.content.data.username);
    });

    const subscription2 = Notifications.addNotificationResponseReceivedListener(response => {
      console.log("Notification Response Received!");
      console.log(response.notification.request.content.data.username);
    })

    return () => {
      subscription1.remove();
      subscription2.remove();
    }
  }, [])

  const scheduleNotificationHandler = () => {
    Notifications.scheduleNotificationAsync({
      content: {
        title: 'My notification here',
        body: "I'm so proud of my notification body!",
        data: {
          username: "Brian"
        },
      },
      trigger: {
        seconds: 5
      },
    });
  }

  const sendPushNotificationHandler = () => {
    fetch("https://exp.host/--/api/v2/push/send", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        to: "ExponentPushToken[6JE4GyDyngUwB0uht0riR4]",
        title: "Testing my hello notification",
        body: "I love wild berries, they make my weekends!"
      })
    })
  }
  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <Button title="Schedule Notification" onPress={scheduleNotificationHandler} />
      <Button title="Send Push Notification" onPress={sendPushNotificationHandler} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
