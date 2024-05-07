import { View, Text, TouchableOpacity } from 'react-native';
import React from 'react';

const CustomButton = ({
	title,
	handlePress,
	containerStyles,
	isLoading,
	textStyles,
}) => {
	return (
		<TouchableOpacity
			onPress={handlePress}
			activeOpacity={0.7}
			className={`bg-secondary rounded-xl min-h-[58px] justify-center items-center ${containerStyles} ${
				isLoading ? 'opacity-50' : ''
			}`}
			disabled={isLoading}
		>
			<Text className={`text-primary font-psemibold text-lg ${textStyles}`}>
				{title}
			</Text>
		</TouchableOpacity>
	);
};

export default CustomButton;
