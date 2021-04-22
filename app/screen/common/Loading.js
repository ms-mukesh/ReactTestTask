import React from 'react';
import {ActivityIndicator, StyleSheet, View,TouchableOpacity,Text,Image} from 'react-native';
import {color as colors, normalize,isANDROID,wp,hp} from '../../helper/themeHelper';
const Loading = props => {
  const {size = 'large', color = colors.blue, isLoading, labelFlag, labelText} = props;
  if (isLoading) {
    return (
      <View style={[style.container,]}>
        <ActivityIndicator size={size} color={color} animating={isLoading} />
        {labelFlag && typeof labelFlag !== 'undefined' && labelFlag && (
          <CustomText style={style.label}>{labelText}</CustomText>
        )}
      </View>
    );
  } else {
    return null;
  }
};
const style = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    right: 0,
    left: 0,
    zIndex: 1000,
    alignItems: 'center',
    justifyContent: 'center',
  },
  label: {
    fontSize: normalize(15),
    fontWeight: 'bold',
    color: colors.blue,
  },
});

export {Loading};
