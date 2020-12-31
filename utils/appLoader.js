import React from 'react';
import { StyleSheet, View , Text,} from "react-native";

const AppLoader = (props) => {
    const { isVisible } = props;
    if (isVisible) {
        return (
            <View style={styles.container}>
                <Text>Loading...</Text>
            </View>
        )
    } else return null;
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'rgba(52, 52, 52, 0.2)',
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        alignItems: 'center',
        justifyContent: 'center'
    }
});

export { AppLoader };
