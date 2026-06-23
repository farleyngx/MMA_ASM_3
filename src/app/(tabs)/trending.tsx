import { MovieCard } from "@/src/components/movie/MovieCard";
import { MovieCardSkeleton } from "../../components/movie/MovieCardSkeleton";
import { Ionicons } from "@expo/vector-icons";
import { Link } from "expo-router";
import React from "react";
import { FlatList, SafeAreaView, Text, TouchableOpacity, View, ActivityIndicator } from "react-native";
import { Loader } from "../../components/common/Loader";
import { useTrending } from "../../hooks/useTrending";

export default function TrendingScreen() {
    const { movies, loading, loadingMore, error, refetch, loadMore } = useTrending();

    if (loading) {
        return (
            <SafeAreaView className="flex-1 bg-netflix-black">
                <View className="flex-row justify-between items-center px-4 py-3">
                    <Text className="text-netflix-red text-[28px] font-black tracking-tighter">
                        NEEDFLEX
                    </Text>
                    <Link href="/search" asChild>
                        <TouchableOpacity className="p-2">
                            <Ionicons name="search" size={26} color="#ffffff" />
                        </TouchableOpacity>
                    </Link>
                </View>
                <FlatList
                    className="mb-16"
                    data={Array.from({ length: 9 })}
                    renderItem={() => (
                        <View className="flex-1 items-center">
                            <MovieCardSkeleton />
                        </View>
                    )}
                    keyExtractor={(_, index) => index.toString()}
                    numColumns={3}
                    showsVerticalScrollIndicator={false}
                />
            </SafeAreaView >
        );
    }

    if (error) {
        return (
            <SafeAreaView className="flex-1 bg-netflix-black">
                <View className="flex-row justify-between items-center px-4 py-3">
                    <Text className="text-netflix-red text-[28px] font-black tracking-tighter">
                        NEEDFLEX
                    </Text>
                    <Link href="/search" asChild>
                        <TouchableOpacity className="p-2">
                            <Ionicons name="search" size={26} color="#ffffff" />
                        </TouchableOpacity>
                    </Link>
                </View>
                <View className="flex-1 justify-center items-center bg-netflix-black p-6">
                    <Text className="text-white text-base mb-4 text-center">{error}</Text>
                    <TouchableOpacity onPress={refetch} className="bg-netflix-red px-6 py-2 rounded-full">
                        <Text className="text-white font-bold">Thử lại</Text>
                    </TouchableOpacity>
                </View>
            </SafeAreaView >
        );
    }

    return (

        <SafeAreaView className="flex-1 bg-netflix-black">
            {/* Custom Header */}
            <View className="flex-row justify-between items-center px-4 py-3">
                <Text className="text-netflix-red text-[28px] font-black tracking-tighter">
                    NEEDFLEX
                </Text>
                <Link href="/search" asChild>
                    <TouchableOpacity className="p-2">
                        <Ionicons name="search" size={26} color="#ffffff" />
                    </TouchableOpacity>
                </Link>
            </View>
            <FlatList
                className="mb-16"
                data={movies}
                renderItem={({ item }) => (
                    <View className="flex-1 items-center">
                        <MovieCard movie={item} />
                    </View>
                )}
                keyExtractor={(item) => item.id.toString()}
                numColumns={3}
                showsVerticalScrollIndicator={false}
                onEndReached={loadMore}
                onEndReachedThreshold={0.5}
                ListFooterComponent={
                    loadingMore ? (
                        <View className="py-4">
                            <ActivityIndicator size="small" color="#E50914" />
                        </View>
                    ) : null
                }
            />
        </SafeAreaView>
    );
}
