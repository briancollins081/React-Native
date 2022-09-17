import { View, Alert, Image, Text, StyleSheet } from "react-native";
import { launchCameraAsync, useCameraPermissions, PermissionStatus } from "expo-image-picker";
import { useState } from "react";
import { Colors } from "../../constants/colors";
import OutlineButton from "../ui/OutlineButton";

const ImagePicker = () => {
    const [pickedImage, setPickedImage] = useState();

    const [cameraPermissionsInfo, requestCameraPermissions] = useCameraPermissions() // for IOS

    const verifyPermissions = async () => {
        if (cameraPermissionsInfo.status === PermissionStatus.UNDETERMINED) {
            const permissionRes = await requestCameraPermissions()

            return permissionRes.granted
        }

        if (cameraPermissionsInfo.status === PermissionStatus.DENIED) {
            Alert.alert("Insufficient Permissions", "You need to grant camera permissions in order to use this feature!")
            return false
        }
        return true;
    }

    const takeImageHandler = async () => {
        try {
            const hasPermission = await verifyPermissions();
            if (!hasPermission) return;

            const image = await launchCameraAsync({
                allowsEditing: true,
                aspect: [16, 9],
                quality: 0.5
            })
            setPickedImage(image);
        } catch (error) {
            console.log(error);
        }
    }
    let imagePreview = <Text>No image taken yet.</Text>
    if (pickedImage && !!pickedImage?.uri) imagePreview = <Image style={styles.image} source={{ uri: pickedImage.uri }} />

    return <View>
        <View style={styles.imagePreview}>
            {imagePreview}
        </View>
        <OutlineButton icon="camera" onPress={takeImageHandler}>
            Take Image
        </OutlineButton>
    </View>
}

export default ImagePicker;

const styles = StyleSheet.create({
    imagePreview: {
        width: "100%",
        height: 200,
        marginVertical: 8,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: Colors.primary100,
        borderRadius: 4,
        overflow: "hidden"
    },
    image: {
        width: "100%",
        height: "100%",
        // borderRadius: 4,
    }
})
