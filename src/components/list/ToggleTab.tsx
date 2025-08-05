import Colors from '@assets/colors/Colors';
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

type Props = {
    onTabChange: (tab: string) => void,
    initialTab: string,
}
const ToggleTabs = ({ onTabChange, initialTab = 'Month' }: Props) => {

    const handleTabPress = (tab: string) => {
        onTabChange?.(tab);
    };

    return (
        <View style={styles.container}>
            {['Month', 'Year'].map((tab) => (
                <TouchableOpacity
                    key={tab}
                    onPress={() => handleTabPress(tab)}
                    style={[
                        styles.tab,
                        initialTab === tab && styles.selectedTab,
                    ]}
                >
                    <Text
                        style={[
                            styles.tabText,
                            initialTab === tab && styles.selectedText,
                        ]}
                    >
                        {tab}
                    </Text>
                </TouchableOpacity>
            ))}
        </View>
    );
};

export default ToggleTabs;

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        backgroundColor: '#f0f0f0',
        borderRadius: 8,
        padding: 4,
        alignSelf: 'center',
    },
    tab: {
        paddingVertical: 10,
        paddingHorizontal: 24,
        borderRadius: 6,
        backgroundColor: 'transparent',
    },
    selectedTab: {
        backgroundColor: Colors.primary_color,
    },
    tabText: {
        fontSize: 16,
        color: '#333',
    },
    selectedText: {
        color: '#fff',
        fontWeight: 'bold',
    },
});
