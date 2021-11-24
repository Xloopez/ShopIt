import React from "react";
import { FC } from "react";
import { View, Text, StyleSheet } from "react-native";
import { useTheme } from "react-native-paper";

interface ICustomChip {
    text: string
}

export const CustomChip: FC<ICustomChip> = ({text}) => {

    const {styles} = useThemedStyles();

    return(
        <View style={styles.itemChip}>
            <Text style={styles.itemChipText}>
                {text}
            </Text>
        </View>
    );
}

const useThemedStyles = () => {
    const theme = useTheme();
    return {
        styles: StyleSheet.create({
            itemChip: {
                flexDirection: 'column',
                marginTop: 10,
                borderRadius: 3,
                paddingTop: 5,
                paddingBottom: 5,
                width: '100%',
                maxWidth: 75,
                backgroundColor: theme.colors.background
            },
            itemChipText: {
                fontWeight: '500',
                textAlign: 'center',
                color: 'black',
                fontSize: 12,
                paddingLeft: 5,
                paddingRight: 5,
            },
        }),
    };
};