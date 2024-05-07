import { View, Text, Image } from 'react-native';
import React from 'react';
import { images } from '../constants';
import CustomButton from './CustomButton';
import { router } from 'expo-router';

const EmptyState = ({ title, subTitle }) => {
	return (
		<View className='flex justify-center items-center px-4 h-auto '>
			<Image
				source={images.empty}
				className='w-[270px] h-[215px] '
				resizeMode='contain'
			/>
			<Text className='text-sm font-pmedium text-gray-100 '>{title}</Text>
			<Text className='font-psemibold text-xl text-center text-white mt-2'>
				{subTitle}
			</Text>

			<CustomButton
				title='Create video'
				handlePress={() => router.push('/create')}
				containerStyles='w-full my-5'
			/>
		</View>
	);
};

export default EmptyState;
