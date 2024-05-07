import {
	View,
	Text,
	TextInput,
	TouchableOpacity,
	Image,
	Alert,
} from 'react-native';
import React, { useState } from 'react';
import { icons } from '../constants';
import { router, usePathname } from 'expo-router';

const SearchInput = ({
	title,
	value,
	handleChangeText,
	otherStyles,
	keyboardType,
	placeholder,
	initialQuery,
}) => {
	const pathname = usePathname();
	const [query, setQuery] = useState(initialQuery || '');

	return (
		<View className='w-full h-16 px-4 bg-black-100 rounded-2xl border-2 border-black-200  focus:border-secondary items-center flex-row space-x-10'>
			<TextInput
				className='flex-1 text-white text-base mt-0.5 font-pregular'
				value={query}
				placeholder='Search for a video topic'
				placeholderTextColor='#cdcde0' // original #7b7b8b
				onChangeText={(e) => setQuery(e)}
			/>

			<TouchableOpacity
				onPress={() => {
					if (!query)
						Alert.alert(
							'Missing query',
							'Please input something to search results across database'
						);

					if (pathname.startsWith('/search')) {
						router.setParams({ query });
					} else {
						router.push(`/search/${query}`);
					}
				}}
			>
				<Image className='w-5 h-5' resizeMode='contain' source={icons.search} />
			</TouchableOpacity>
		</View>
	);
};

export default SearchInput;
