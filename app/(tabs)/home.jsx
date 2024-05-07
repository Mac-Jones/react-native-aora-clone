import { View, Text, FlatList, Image, RefreshControl } from 'react-native';
import { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { images } from '../../constants';
import { StatusBar } from 'expo-status-bar';
import SearchInput from '../../components/SearchInput';
import Trending from '../../components/Trending';
import EmptyState from '../../components/EmptyState';
import { getAllPosts, getLatestPosts } from '../../lib/appwrite';
import useAppwrite from '../../lib/useAppwrite';
import VideoCard from '../../components/VideoCard';
import { useGlobalContext } from '../../context/GlobalProvider';

const Home = () => {
	const { user } = useGlobalContext();

	const { data: posts, refetch } = useAppwrite(getAllPosts);
	const { data: latestPosts } = useAppwrite(getLatestPosts);

	const [refreshing, setRefreshing] = useState(false);

	const onRefresh = async () => {
		setRefreshing(true);
		await refetch();
		setRefreshing(false);
	};

	return (
		<SafeAreaView className='bg-primary h-full'>
			<FlatList
				data={posts}
				renderItem={({ item }) => <VideoCard videoItem={item} />}
				keyExtractor={(item) => item.$id}
				ListHeaderComponent={() => (
					<View className='my-6 px-4 space-y-6'>
						<View className='flex-row mb-6 justify-between items-start'>
							<View>
								<Text className='font-pmedium text-sm text-gray-100'>
									Welcome back,
								</Text>
								<Text className='font-psemibold text-2xl text-white'>
									{user?.username}
								</Text>
							</View>

							<View className='mt-1.5'>
								<Image
									source={images.logoSmall}
									className='w-9 h-10'
									resizeMode='contain'
								/>
							</View>
						</View>

						<SearchInput />

						<View className='w-full flex-1 pt-5 pb-8'>
							<Text className='text-lg font-pregular text-gray-100 mb-3'>
								Latest Videos
							</Text>

							<Trending posts={latestPosts ?? []} />
						</View>
					</View>
				)}
				ListEmptyComponent={() => (
					<EmptyState
						title='No videos found'
						subTitle='Be the first one to upload a video'
					/>
				)}
				refreshControl={
					<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
				}
			/>

			<StatusBar backgroundColor='#161622' style='light' />
		</SafeAreaView>
	);
};

export default Home;
