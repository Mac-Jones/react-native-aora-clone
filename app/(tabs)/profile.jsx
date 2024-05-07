import { View, FlatList, TouchableOpacity, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import EmptyState from '../../components/EmptyState';
import { getUsersPost, signOut } from '../../lib/appwrite';
import useAppwrite from '../../lib/useAppwrite';
import VideoCard from '../../components/VideoCard';
import { useGlobalContext } from '../../context/GlobalProvider';
import { icons } from '../../constants';
import InfoBox from '../../components/InfoBox';
import { router } from 'expo-router';

const Profile = () => {
	const { user, setUser, setIsLoggedIn } = useGlobalContext();

	const { data: posts } = useAppwrite(() => getUsersPost(user.$id));

	const logout = async () => {
		await signOut();
		setUser(null);
		setIsLoggedIn(false);
		router.replace('/sign-in');
	};

	return (
		<SafeAreaView className='bg-primary h-full'>
			<FlatList
				data={posts}
				renderItem={({ item }) => <VideoCard videoItem={item} />}
				keyExtractor={(item) => item.$id}
				ListHeaderComponent={() => (
					<View className='w-full justify-center items-center mt-6 mb-12 px-4'>
						<TouchableOpacity
							className='w-full items-end mb-10'
							onPress={logout}
						>
							<Image
								source={icons.logout}
								className='w-6 h-6'
								resizeMode='contain'
							/>
						</TouchableOpacity>
						<View className='w-16 h-16 rounded-lg border border-secondary justify-center items-center '>
							<Image
								source={{ uri: user?.avatar }}
								className='w-[90%] h-[90%] rounded-lg'
								resizeMode='contain'
							/>
						</View>
						<InfoBox
							title={user?.username}
							containerStyles='mt-5'
							titleStyles='text-lg'
						/>
						<View className='mt-5 flex-row'>
							<InfoBox
								title={posts?.length || 0}
								subtitle='Posts'
								containerStyles='mr-10'
								titleStyles='text-xl'
							/>
							<InfoBox
								title='1.2k'
								subtitle='Followers'
								titleStyles='text-xl'
							/>
						</View>
					</View>
				)}
				ListEmptyComponent={() => (
					<EmptyState
						title='No videos found'
						subTitle='No videos found for this search query'
					/>
				)}
			/>

			<StatusBar backgroundColor='#161622' style='light' />
		</SafeAreaView>
	);
};

export default Profile;
