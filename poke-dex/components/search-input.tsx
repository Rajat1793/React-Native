import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { StyleSheet, TextInput, TextInputProps, View } from 'react-native';
import { COLORS } from '../constant/colors';


interface SearchInputProps extends TextInputProps {
    onClear?: () => void;
}


const SearchInput = ({onClear , style , ...props}:SearchInputProps) => {
  return (
    <View style={styles.container}>
            <Ionicons name="search" size={20} color={COLORS.subtext} style={styles.icon} />
            <TextInput
                style={[styles.input, style]}
                placeholderTextColor={COLORS.subtext}
                {...props}
            />
            {props.value ? (
                <Ionicons
                    name="close-circle"
                    size={20}
                    color={COLORS.subtext}
                    onPress={onClear}
                    style={styles.clearIcon}
                />
            ) : null}
        </View>
  )
}

export default SearchInput

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: COLORS.card,
        borderRadius: 12,
        borderWidth: 1,
        borderColor: COLORS.border,
        paddingHorizontal: 12,
        height: 48,
    },
    icon: {
        marginRight: 8,
    },
    input: {
        flex: 1,
        color: COLORS.text,
        fontSize: 16,
        height: '100%',
    },
    clearIcon: {
        marginLeft: 8,
    },
});