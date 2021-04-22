import React, {useState, useEffect} from 'react';
import {
  NativeModules,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {hp, wp, normalize} from '../../helper/themeHelper';
import {
  deleteDataFromFireStore,
  getAllData,
} from '../../helper/firebaseMethodHelper';
import {AppButton} from '../common/AppButton';
import {setUserListData} from '../../redux/action/appAction';
import {Loading} from "../common/Loading";
const HomeScreen = props => {
  const isLoading = useSelector(
    state => state.appDefaultSettingReducer.isLoading,
  );
  const userList = useSelector(
    state => state.appDefaultSettingReducer.userList,
  );

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setUserListData());
  }, []);
  const [employeList, setEmployeList] = useState([]);
  useEffect(() => {
    getAllData().then(empList => {
      if (empList) {
        setEmployeList(empList);
      }
    });
  }, []);
  const renderRow = (data, index) => {
    return (
      <View
        key={index}
        style={{
          flexDirection: 'row',
          padding: hp(2),
          borderBottomWidth: hp(0.05),
        }}>
        <View style={{flex: 2}}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Text style={style.txtValue}>{data.item._data.name}</Text>
            <Text style={style.txtValue}>{data.item._data.phoneNumber}</Text>
          </View>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Text style={style.txtValue}>{data.item._data.designation}</Text>
            <Text style={style.txtValue}>{data.item._data.salary}</Text>
          </View>
        </View>
        <View style={{flex: 1}}>
          <AppButton
            customBtnText={{fontSize: normalize(12)}}
            containerStyle={{
              height: hp(5),
              width: wp(20),
            }}
            title={'Edit'}
            onPress={() => {
              props.navigation.navigate('EditDataScreen', {
                empName: data.item._data.name,
                salary: data.item._data.salary,
                designation: data.item._data.designation,
                phoneNumber: data.item._data.phoneNumber,
                dataId: data.item._ref._documentPath._parts[1],
              });
            }}
          />
        </View>
        <View style={{flex: 1}}>
          <AppButton
            customBtnText={{fontSize: normalize(12)}}
            containerStyle={{
              height: hp(5),
              width: wp(20),
            }}
            title={'Delete'}
            onPress={() => {
              deleteDataFromFireStore(
                data.item._ref._documentPath._parts[1],
              ).then(isDeleted => {
                alert('deleted...');
                dispatch(setUserListData());
              });
            }}
          />
        </View>
      </View>
    );
  };

  return (
    <View>
      {isLoading && <Loading isLoading={isLoading} />}
      <View style={{height: hp(80)}}>
        <FlatList
          numColumns={1}
          data={userList}
          showsVerticalScrollIndicator={true}
          showsHorizontalScrollIndicator={true}
          renderItem={renderRow}
          keyExtractor={(item, index) => index.toString()}
        />
      </View>
      <View style={{height: hp(20)}}>
        <AppButton
          title={'Add New'}
          onPress={() => {
            props.navigation.navigate('AddDataScreen');
          }}
        />
      </View>
    </View>
  );
};
const style = StyleSheet.create({
  buttonView: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  btn: {
    height: hp(5),
    width: wp(30),
  },
  btnText: {
    fontSize: normalize(12),
  },
  txtValue: {
    flex: 1,
    fontSize: normalize(13),
  },
});
export default HomeScreen;
