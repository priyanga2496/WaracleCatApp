// HomeScreen.tsx
import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, Dimensions, ScrollView, Alert, Image } from 'react-native';
import apiService from '../../services/apiService';
import CatItem from '../catList/catListScreen';
import ButtonComponent from '../common/button';
import { useNavigation } from '@react-navigation/native';

const HomeScreen = () => {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();

  useEffect(() => {
    fetchUploadedImages();
  }, []);

  const fetchUploadedImages = async () => {
    try {
      const [imageData, voteData] = await Promise.all([apiService.fetchImages(), apiService.fetchVotes()]);
      const imagesWithVotes = imageData.map((image: any) => {
        const vote = voteData.find((v: any) => v.image_id === image.id);
        return {
          ...image,
          vote_id: vote ? vote.id : null,
          score: vote ? vote.value : 0,
        };
      });
      setImages(imagesWithVotes);
    } catch (error) {
      Alert.alert(`Failed to fetch images or votes ,${error}`)

      console.error('Failed to fetch images or votes', error);
    } finally {
      setLoading(false);
    }
  };

  const handleVote = async (id: string, voteType: string, vote_id: any) => {
    try {
      const value = voteType === 'up' ? 1 : -1;
      const response = await apiService.addVote(id, value);
      updateImageVote(id, response.id, value);
    } catch (error) {
      Alert.alert(`Failed to cast vote ,${error}`)
      console.error('Failed to cast vote', error);
    }
  };

  const updateImageVote = (image_id: string, vote_id: any, scoreChange: number) => {
    const updatedImages: any = images.map((image: any) => {
      if (image?.id === image_id) {
        return {
          ...image,
          vote_id,
          score: image.score + scoreChange,
        };
      }
      return image;
    });
    setImages(updatedImages);
  };

  const numColumns = Math.floor(Dimensions.get('window').width / 180);

  return (
    <View style={styles.container}>
      {loading ? (
        <Text>Loading...</Text>
      ) : (
        <ScrollView contentContainerStyle={{ flex: 1 }} showsVerticalScrollIndicator={false}>
          <Text style={styles.title}>My Cute Cats</Text>

          {images.length  > 0 ?
            (<FlatList
              data={images}
              renderItem={({ item }) => <CatItem item={item} onVote={handleVote} />}
              keyExtractor={(item: any) => item.id}
              numColumns={numColumns}
              contentContainerStyle={styles.list}
            />
            )
            : (
              <View style={styles.textContainer}>
                <Text style={styles.subtitle}>No Cat image found,Press upload images option</Text>
                <Image 
                  source={require('../../assets/images/nodata.png')}
                  style={{ height: 100, width: 100, marginBottom: 20  ,alignSelf:'center'}}
                  />
                <ButtonComponent
                  title={'Upload Images'}
                  onPress={() => navigation.navigate('Upload')}
                  disabled={false}
                  containerStyle={{ width: '60%', alignSelf: 'center' }}
                />
              </View>
            )
          }
        </ScrollView>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 10,
  }, 
  subtitle: {
    fontSize: 14,
    color: '#888',
    marginBottom: 20,
    textAlign: 'left',
    paddingLeft:10
  },
  list: {
    justifyContent: 'center',
  }, title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'left',
    marginTop: 10,
    paddingLeft: 10,
  },
  textContainer: {
    marginTop: 20,

  }
});

export default HomeScreen;
