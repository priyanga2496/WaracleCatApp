// CatListItem.tsx
import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import apiService from '../../services/apiService';

const CatItem = ({ item, onVote }: any) => {
  const [isFavourite, setIsFavourite] = useState(item.favourite_id ? true : false);
  const [favouriteId, setFavouriteId] = useState(item.favourite_id || null);

  const handleFavouriteToggle = async () => {
    try {
      if (isFavourite) {
        await apiService.removeFavourite(favouriteId);
        setIsFavourite(false);
        setFavouriteId(null);
      } else {
        const response = await apiService.addFavourite(item.id);
        setIsFavourite(true);
        setFavouriteId(response.id);
      }
    } catch (error:any) {
      Alert.alert(error);
      console.error('Error handling favourite:', error);
    }
  };

  return (
    <View style={styles.catItem}>
      <Image source={{ uri: item.url }} style={styles.catImage} />
      <TouchableOpacity style={styles.favouriteButton} onPress={handleFavouriteToggle}>
        <Image source={isFavourite ? require('../../assets/images/filled-heart.png') : require('../../assets/images/heart.png')} style={{ width: 20, height: 20 }} />
      </TouchableOpacity>

      <View style={styles.voteButtons}>
        <TouchableOpacity style={styles.voteButton} onPress={() => onVote(item.id, 'up', item.vote_id)}>
          <Text style={styles.voteText}>Vote 👍</Text> 
          {/* //used emogi for better ui usage */}
        </TouchableOpacity>
        <TouchableOpacity style={styles.voteButton} onPress={() => onVote(item.id, 'down', item.vote_id)}>
          <Text style={styles.voteText}>Vote 👎</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.score}>Score: {item.score || 0}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  catItem: {
    flex: 1,
    margin: 10,
    alignItems: 'center',
    backgroundColor: '#f9f9f9',
    borderRadius: 10,
    padding: 10,
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowRadius: 5,
  },
  catImage: {
    width: 150,
    height: 150,
    borderRadius: 10,
    resizeMode: 'cover',
    marginTop:20
  },
  favouriteButton: {
    position: 'absolute',
    top: 4,
    right: 0,
    padding: 5,
  },
  voteButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  voteButton: {
    backgroundColor: '#7A57D1',
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
    marginHorizontal: 5,
  },
  voteText: {
    color: '#fff',
  },
  score: {
    marginTop: 10,
    fontSize: 16,
    color: '#333',
  },
});

export default CatItem;
