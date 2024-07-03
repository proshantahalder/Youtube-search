import React, { useState } from 'react';
import { View, Text, TextInput, Button, FlatList, StyleSheet, Image } from 'react-native';
import axios from 'axios';

const API_KEY = 'AIzaSyAccpjsoyGkFNIsVeQDfmHm3vXDb_BI_Eo'; // Replace with your actual API key
const BASE_URL = 'https://www.googleapis.com/youtube/v3';

const YouTubeSearch = () => {
  const [query, setQuery] = useState('');
  const [videos, setVideos] = useState([]);

  const searchVideos = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/search`, {
        params: {
          part: 'snippet',
          q: query,
          type: 'video',
          maxResults: 10,
          key: API_KEY,
        },
      });
      setVideos(response.data.items);
    } catch (error) {
      console.error('Error fetching videos:', error);
    }
  };

  const renderVideoItem = ({ item }) => (
    <View style={styles.videoItem}>
      <Image 
        source={{ uri: item.snippet.thumbnails.default.url }}
        style={styles.thumbnail}
      />
      <Text style={styles.videoTitle}>{item.snippet.title}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        value={query}
        onChangeText={setQuery}
        placeholder="Search YouTube videos"
      />
      <Button title="Search" onPress={searchVideos} />
      <FlatList
        data={videos}
        keyExtractor={(item) => item.id.videoId}
        renderItem={renderVideoItem}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  videoItem: {
    flexDirection: 'row',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    alignItems: 'center',
  },
  thumbnail: {
    width: 120,
    height: 90,
    marginRight: 10,
  },
  videoTitle: {
    fontSize: 16,
    flex: 1,
  },
});

export default YouTubeSearch;