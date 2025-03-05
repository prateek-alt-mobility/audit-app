import React from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { useGetPostsQuery, useCreatePostMutation } from "../store/services/api";
import { MaterialIcons, Feather } from "@expo/vector-icons";

export default function Posts() {
  const { data: posts, isLoading, error, refetch } = useGetPostsQuery();
  const [createPost, { isLoading: isCreating }] = useCreatePostMutation();

  const handleCreatePost = async () => {
    try {
      await createPost({
        title: "New Post",
        body: "This is a new post created with RTK Query",
      }).unwrap();
      refetch(); // Refresh the posts list
    } catch (err) {
      console.error("Failed to create post:", err);
    }
  };

  if (isLoading) {
    return (
      <View className="p-4 items-center">
        <ActivityIndicator size="large" color="black" />
      </View>
    );
  }

  if (error) {
    return (
      <View className="p-4">
        <Text className="text-red-500 text-center">Error loading posts</Text>
        <TouchableOpacity
          className="bg-black py-2 rounded-xl mt-2 flex-row items-center justify-center space-x-2"
          onPress={refetch}
        >
          <Feather name="refresh-ccw" size={20} color="white" />
          <Text className="text-white text-center">Try Again</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View className="p-4">
      <View className="flex-row justify-between items-center mb-4">
        <View className="flex-row items-center space-x-2">
          <MaterialIcons name="article" size={24} color="black" />
          <Text className="text-xl font-bold">Posts</Text>
        </View>
        <TouchableOpacity
          className="bg-black px-4 py-2 rounded-xl flex-row items-center space-x-2"
          onPress={handleCreatePost}
          disabled={isCreating}
        >
          {isCreating ? (
            <ActivityIndicator size="small" color="white" />
          ) : (
            <>
              <Feather name="plus" size={20} color="white" />
              <Text className="text-white">Add Post</Text>
            </>
          )}
        </TouchableOpacity>
      </View>

      <ScrollView className="h-48">
        {posts?.slice(0, 5).map((post) => (
          <View key={post.id} className="bg-gray-50 p-4 rounded-xl mb-2">
            <Text className="font-bold">{post.title}</Text>
            <Text className="text-gray-600 mt-1">{post.body}</Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}
