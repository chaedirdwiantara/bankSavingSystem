import React from 'react';
import {
    Modal as RNModal,
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Dimensions,
} from 'react-native';
import { Colors } from '@constants/colors';
import { FontSizes, FontWeights } from '@constants/typography';
import { Spacing, BorderRadius } from '@constants/spacing';
import { Button } from './Button';

interface ModalProps {
    visible: boolean;
    onClose: () => void;
    title?: string;
    children: React.ReactNode;
    primaryButton?: {
        title: string;
        onPress: () => void;
        loading?: boolean;
    };
    secondaryButton?: {
        title: string;
        onPress: () => void;
    };
    size?: 'sm' | 'md' | 'lg';
}

export const Modal: React.FC<ModalProps> = ({
    visible,
    onClose,
    title,
    children,
    primaryButton,
    secondaryButton,
    size = 'md',
}) => {
    const modalWidth = size === 'sm' ? '80%' : size === 'md' ? '90%' : '95%';

    return (
        <RNModal
            visible={visible}
            transparent
            animationType="fade"
            onRequestClose={onClose}>
            <View style={styles.overlay}>
                <TouchableOpacity
                    style={StyleSheet.absoluteFill}
                    activeOpacity={1}
                    onPress={onClose}
                />

                <View style={[styles.modal, { width: modalWidth }]}>
                    {title && (
                        <View style={styles.header}>
                            <Text style={styles.title}>{title}</Text>
                            <TouchableOpacity onPress={onClose} style={styles.closeButton}>
                                <Text style={styles.closeText}>✕</Text>
                            </TouchableOpacity>
                        </View>
                    )}

                    <View style={styles.content}>{children}</View>

                    {(primaryButton || secondaryButton) && (
                        <View style={styles.footer}>
                            {secondaryButton && (
                                <Button
                                    title={secondaryButton.title}
                                    onPress={secondaryButton.onPress}
                                    variant="outline"
                                    style={styles.footerButton}
                                />
                            )}
                            {primaryButton && (
                                <Button
                                    title={primaryButton.title}
                                    onPress={primaryButton.onPress}
                                    loading={primaryButton.loading}
                                    style={styles.footerButton}
                                />
                            )}
                        </View>
                    )}
                </View>
            </View>
        </RNModal>
    );
};

const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    modal: {
        backgroundColor: Colors.background,
        borderRadius: BorderRadius.xl,
        maxHeight: Dimensions.get('window').height * 0.8,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: Spacing.lg,
        borderBottomWidth: 1,
        borderBottomColor: Colors.border,
    },
    title: {
        fontSize: FontSizes.xl,
        fontWeight: FontWeights.bold,
        color: Colors.textPrimary,
        flex: 1,
    },
    closeButton: {
        padding: Spacing.xs,
    },
    closeText: {
        fontSize: FontSizes['2xl'],
        color: Colors.textSecondary,
    },
    content: {
        padding: Spacing.lg,
    },
    footer: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        padding: Spacing.lg,
        borderTopWidth: 1,
        borderTopColor: Colors.border,
        gap: Spacing.sm,
    },
    footerButton: {
        flex: 1,
        maxWidth: 150,
    },
});
