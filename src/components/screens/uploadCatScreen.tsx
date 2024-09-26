//uploadCatScreen.tsx
import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, Dimensions, Alert } from 'react-native';
import { launchImageLibrary } from 'react-native-image-picker'; 
import ButtonComponent from '../common/button'; 
import { useNavigation } from '@react-navigation/native'; 
import apiService from '../../services/apiService'; 

const UploadCatImageScreen = () => {
  const [selectedImage, setSelectedImage] = useState<any>(null);
  const [isUploading, setIsUploading] = useState(false); 
  const width = Dimensions.get('window').width - 40;
  const navigation = useNavigation(); 

  const handleUploadPress = () => {
    const options: any = {
      mediaType: 'photo',
      includeBase64: false,
      quality: 1,
    };

    launchImageLibrary(options, (response: any) => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.errorMessage) {
        console.log('ImagePicker Error: ', response.errorMessage);
      } else {
        const uri = response.assets[0].uri; // Get image URI
        setSelectedImage(response.assets[0]); 
      }
    });
  };

  const handleImageUploadToAPI = async () => {
    if (!selectedImage) {
      Alert.alert('Error', 'Please select an image first');
      return;
    }

    try {
      setIsUploading(true); // Start uploading
      const response = await apiService.uploadCatImage(selectedImage); // Call API service

      if (response) {
        Alert.alert('Success', 'Image uploaded successfully!');
        navigation.navigate('Home'); // Redirect to Home after upload
      } else {
        Alert.alert('Error', 'Failed to upload image. Please try again.');
      }
    } catch (error:any) {
        if (error?.response && error?.response.data) {
          console.error('Error details:', error?.response.data);
          Alert.alert('Error', ` ${error?.response.data}`);
        } else {
          Alert.alert('Error', 'An unknown error occurred during image upload.');
        }
    } finally {
      setIsUploading(false); // Stop uploading
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Upload Cat Image</Text>
        <Text style={styles.subtitle}>Please upload a cute cat image below.</Text>

        <TouchableOpacity style={[styles.imageUploadArea, !selectedImage && styles.imagePlaceholder ,{width: width}]} onPress={handleUploadPress}>
          {selectedImage ? (
            <Image
              source={{ uri: selectedImage.uri }} // Display selected image
              style={styles.catImage}
            />
          ) : (
            <View style={styles.placeholderContent}>
              <Text style={styles.placeholderText}>Upload Here</Text>
              <Image
                source={require('../../assets/images/uploadimage.png')} 
                style={styles.icon}
              />
            </View>
          )}
        </TouchableOpacity>
      </View>

      <ButtonComponent
        title={isUploading ? 'Uploading...' : 'Upload Cat Image'}
        loading={isUploading}
        onPress={handleImageUploadToAPI}
        disabled={isUploading || !selectedImage}
        containerStyle={{ width: '90%', alignSelf: 'center' }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  content: {
    alignItems: 'flex-start',
    paddingTop: 20,
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'left',
  },
  subtitle: {
    fontSize: 14,
    color: '#888',
    marginBottom: 20,
    textAlign: 'center',
  },
  imageUploadArea: {
    height: 200,
    borderRadius: 10,
    marginBottom: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  imagePlaceholder: {
    borderWidth: 2,
    borderColor: '#ccc', 
    borderStyle: 'dashed', 
  },
  placeholderContent: {
    alignItems: 'center',
  },
  placeholderText: {
    color: '#888',
    fontSize: 16,
    marginBottom: 10,
  },
  icon: {
    width: 40,
    height: 40,
    tintColor: '#888',
  },
  catImage: {
    width: '100%',
    height: '100%',
    borderRadius: 10,
    resizeMode: 'cover',
  },
});

export default UploadCatImageScreen;
