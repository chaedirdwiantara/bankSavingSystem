import React from 'react';
import { ActivityIndicator, View, StyleSheet } from 'react-native';
import { Colors } from '@constants/colors';

interface LoadingProps {
    size?: 'small' | 'large';
    color?: string;
    fullScreen?: boolean;
}

export const Loading: React.FC<LoadingProps> = ({
    size = 'large',
    color = Colors.primary,
    fullScreen = false,
}) => {
    if (fullScreen) {
        return (
            <View style={styles.fullScreen}>
                <ActivityIndicator size={size} color={color} />
            </View>
        );
    }

    return <ActivityIndicator size={size} color={color} />;
};

const styles = StyleSheet.create({
    fullScreen: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Colors.background,
    },
});
