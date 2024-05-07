import { View, Text, TextInput, TouchableOpacity, Image } from 'react-native';
import React, { useState } from 'react';
import { icons } from '../constants';

const FormField = ({
	title,
	value,
	handleChangeText,
	otherStyles,
	placeholder,
}) => {
	const [showPassword, setShowPassword] = useState(false);

	return (
		<View className={`space-y-2 ${otherStyles}`}>
			<Text className='text-base text-gray-100 font-pmedium'>{title}</Text>
			<View className='w-full h-16 px-4 bg-black-100 rounded-2xl border-2 border-black-200  focus:border-secondary items-center flex-row '>
				<TextInput
					className='flex-1 text-white font-psemibold text-sm' // change text-base if needed
					value={value}
					placeholder={placeholder}
					onChangeText={handleChangeText}
					placeholderTextColor='#7b7b8b' //'#cdcde0'
					secureTextEntry={title === 'Password' && !showPassword}
				/>

				{title === 'Password' && (
					<TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
						<Image
							className='w-6 h-6'
							resizeMode='contain'
							source={!showPassword ? icons.eye : icons.eyeHide}
						/>
					</TouchableOpacity>
				)}
			</View>
		</View>
	);
};

export default FormField;
