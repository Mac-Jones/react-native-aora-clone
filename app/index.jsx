import { StatusBar } from 'expo-status-bar';
import { Image, ScrollView, Text, View } from 'react-native';
import { Redirect, router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { images } from '../constants';
import CustomButton from '../components/CustomButton';
import { useGlobalContext } from '../context/GlobalProvider';

export default function App() {
	const { isLoggedIn, isLoading } = useGlobalContext();

	if (!isLoading && isLoggedIn) return <Redirect href='/home' />;

	return (
		<SafeAreaView className='bg-primary h-full  '>
			<ScrollView contentContainerStyles={{ height: '100%' }}>
				<View className='w-full min-h-[90vh] justify-center items-center px-4'>
					<Image
						source={images.logo}
						className='w-[130px] h-[84px]'
						resizeMode='contain'
					/>
					<Image
						source={images.cards}
						className='max-w-[380px] w-full h-[300px]'
						resizeMode='contain'
					/>
					<View className='relative mt-5 w-[300px]'>
						<Text className='text-3xl text-white font-bold text-center'>
							Discover Endless Posibilities with{' '}
							<Text className='text-secondary-200'>Aora</Text>
						</Text>
						<Image
							source={images.path}
							className='w-[136px] h-[15px] absolute -bottom-2  -right-0'
							resizeMode='contain'
						/>
					</View>
					<Text className='text-sm font-pregular text-gray-100 mt-7 text-center'>
						Where creativiy meets innovation: Embark on a journey of limitless
						exploration with Aora
					</Text>

					<CustomButton
						title='Continue with Email'
						handlePress={() => router.push('/sign-in')}
						containerStyles='mt-7 w-full'
					/>
				</View>
			</ScrollView>

			<StatusBar backgroundColor='#161622' style='light' />
		</SafeAreaView>
	);
}
