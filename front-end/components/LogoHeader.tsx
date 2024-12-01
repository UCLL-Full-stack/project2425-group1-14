import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

const LogoHeader = () => {
    return (
        <View style={styles.header}>
            <Text style={styles.logo}>MyLogo</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    header: {
        height: 60,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f8f8f8',
        borderBottomWidth: 1,
        borderBottomColor: '#ddd',
    },
    logo: {
        fontSize: 24,
        fontWeight: 'bold',
    },
});

export default LogoHeader;