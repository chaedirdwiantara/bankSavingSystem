import React from 'react';
import {
    View,
    StyleSheet,
    ScrollView,
    ViewStyle,
    KeyboardAvoidingView,
    Platform,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors } from '@constants/colors';
import { Spacing } from '@constants/spacing';

interface ScreenProps {
    children: React.ReactNode;
    style?: ViewStyle;
    scrollable?: boolean;
    padding?: boolean;
    keyboardAvoiding?: boolean;
}

export const Screen: React.FC<ScreenProps> = ({
    children,
    style,
    scrollable = false,
    padding = true,
    keyboardAvoiding = true,
}) => {
    const content = (
        <View
            style={[
                styles.container,
                padding && styles.padding,
                style,
            ]}>
            {children}
        </View>
    );

    const wrappedContent = scrollable ? (
        <ScrollView
            style={styles.scroll}
            contentContainerStyle={styles.scrollContent}
            showsVerticalScrollIndicator={false}>
            {content}
        </ScrollView>
    ) : (
        content
    );

    if (keyboardAvoiding) {
        return (
            <SafeAreaView style={styles.safeArea}>
                <KeyboardAvoidingView
                    style={styles.keyboardAvoid}
                    behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                    keyboardVerticalOffset={Platform.OS === 'ios' ? 64 : 0}>
                    {wrappedContent}
                </KeyboardAvoidingView>
            </SafeAreaView>
        );
    }

    return (
        <SafeAreaView style={styles.safeArea}>
            {wrappedContent}
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: Colors.background,
    },
    keyboardAvoid: {
        flex: 1,
    },
    container: {
        flex: 1,
    },
    padding: {
        padding: Spacing.md,
    },
    scroll: {
        flex: 1,
    },
    scrollContent: {
        flexGrow: 1,
    },
});
