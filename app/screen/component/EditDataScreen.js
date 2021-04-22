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
import {
  hp,
  wp,
  normalize,
  color,
  font,
  isANDROID,
  isIOS,
} from '../../helper/themeHelper';
import {LabelInputText} from '../common/LabelInputText';
import {FloatingLabel} from '../common/FloatingLabel';
import {AppButton} from '../common/AppButton';
import {
  createUserEntryOnFireStore,
  editDataOnFirestore,
  getAllData,
} from '../../helper/firebaseMethodHelper';
import {setLoaderStatus, setUserListData} from '../../redux/action/appAction';
import {Loading} from "../common/Loading";
const EditData = props => {
  const isLoading = useSelector(
    state => state.appDefaultSettingReducer.isLoading,
  );
  const {
    empName = '',
    salary = '',
    designation = '',
    phoneNumber = '',
    dataId = '',
  } = props.route.params;
  const defaultDataObj = {
    empName: empName,
    designation: designation,
    phoneNo: phoneNumber,
    salary: salary,
    dataId: dataId,
  };
  const dispatch = useDispatch();
  const [data, setData] = useState({...defaultDataObj});
  const renderNameFloatingTextInput = (
    lable,
    value,
    key,
    extraLabel = null,
    keyType = null,
    isMultiLine = false,
  ) => {
    return (
      <View
        style={{
          flex: 1,
          borderBottomWidth: 1,
          borderBottomColor: color.gray,
          marginHorizontal: wp(0.5),
        }}>
        {isMultiLine ? (
          <LabelInputText
            multiline={true}
            numberOfLines={4}
            inputStyle={style.floatingInputStyle}
            style={[style.floatingStyle, {width: wp(80)}]}
            label={lable + '  '}
            editable={true}
            value={value}
            keyboardType={keyType !== null ? keyType : 'default'}
            returnKeyType={'done'}
            autoCapitalize="characters"
            extraLabel={extraLabel}
            onChangeText={text => {
              setData({...data, [key]: text});
            }}
          />
        ) : (
          <FloatingLabel
            numberOfLines={1}
            inputStyle={style.floatingInputStyle}
            style={[style.floatingStyle, {width: wp(80)}]}
            label={lable + '  '}
            editable={true}
            value={value}
            autoCapitalize="characters"
            extraLabel={extraLabel}
            keyboardType={keyType !== null ? keyType : 'default'}
            returnKeyType={'done'}
            onChangeText={text => {
              setData({...data, [key]: text});
            }}
          />
        )}
      </View>
    );
  };

  return (
    <View style={{flex: 1}}>
      {isLoading && <Loading isLoading={isLoading} />}
      <View style={[style.groupView]}>
        <View style={[style.innerView]}>
          <View
            style={{
              ...style.iconContainer,
              marginBottom: 0,
              borderBottomWidth: 1,
              borderBottomColor: color.gray,
              paddingVertical: hp(1),
            }}
          />
          {renderNameFloatingTextInput(
            'Name',
            data.empName,
            'empName',
            true,
            null,
            false,
          )}
        </View>
        <View style={[style.innerView]}>
          <View
            style={{
              ...style.iconContainer,
              marginBottom: 0,
              borderBottomWidth: 1,
              borderBottomColor: color.gray,
              paddingVertical: hp(1),
            }}
          />
          {renderNameFloatingTextInput(
            'Designation',
            data.designation,
            'designation',
            true,
            null,
            false,
          )}
        </View>
        <View style={[style.innerView]}>
          <View
            style={{
              ...style.iconContainer,
              marginBottom: 0,
              borderBottomWidth: 1,
              borderBottomColor: color.gray,
              paddingVertical: hp(1),
            }}
          />
          {renderNameFloatingTextInput(
            'Phone No',
            data.phoneNo,
            'phoneNo',
            true,
            null,
            false,
          )}
        </View>
        <View style={[style.innerView]}>
          <View
            style={{
              ...style.iconContainer,
              marginBottom: 0,
              borderBottomWidth: 1,
              borderBottomColor: color.gray,
              paddingVertical: hp(1),
            }}
          />
          {renderNameFloatingTextInput(
            'Salary',
            data.salary,
            'salary',
            true,
            null,
            false,
          )}
        </View>
        <AppButton
          title={'Edit'}
          onPress={() => {
            if (data.empName.length === 0 || data.empName === '') {
              alert('please enter employe name');
              return;
            } else if (
              data.designation.length === 0 ||
              data.designation === ''
            ) {
              alert('please enter designation');
              return;
            } else if (data.phoneNo.length !== 10 || isNaN(data.phoneNo)) {
              alert('please enter correct Phone Number');
              return;
            } else if (data.salary.length === 0 || isNaN(data.salary)) {
              alert('please enter correct salary');
              return;
            }
            dispatch(setLoaderStatus(true))
            editDataOnFirestore(data).then(isEdited => {
              dispatch(setLoaderStatus(false))
              if (isEdited) {
                alert('Edited');
                dispatch(setUserListData());
                props.navigation.goBack();
              } else {
                alert('Failed');
              }
            });
          }}
        />
      </View>
    </View>
  );
};
const style = StyleSheet.create({
  center: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  textStyle: {
    // fontFamily: font.robotoRegular,
    color: color.blue,
    fontSize: normalize(13),
  },
  innerView: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    marginVertical: hp(0.5),
    borderBottomColor: color.gray,
  },
  groupView: {
    backgroundColor: color.creamDarkGray,
    padding: wp(2),
    borderRadius: wp(5),
  },
  iconContainer: {
    marginBottom: isANDROID ? hp(1.5) : hp(1.2),
    marginHorizontal: wp(1),
  },
  floatingStyle: {},
  floatingInputStyle: {
    borderWidth: 0,
    fontSize: normalize(12),
    // fontFamily: font.robotoRegular,
    height: isANDROID ? hp(6) : hp(5),
    marginTop: isANDROID ? hp(3) : hp(2),
  },
  floatingAddressInputStyle: {
    borderWidth: 0,
    fontSize: normalize(12),
    // fontFamily: font.robotoRegular,
    color: color.black,
    justifyContent: 'center',
    padding: hp(1),
    maxHeight: 200,
    marginHorizontal: wp(1),
  },
  floatingLableStyle: {
    // fontFamily: font.robotoRegular,
  },
  trustFactorRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: hp(1),
  },
  textInputContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    borderBottomWidth: 1,
    marginVertical: hp(0.5),
    borderBottomColor: color.gray,
    marginHorizontal: wp(1),
    flex: 1,
  },
  fontStyle: {
    color: color.blue,
    fontSize: normalize(17),
    // fontFamily: font.robotoBold,
    textAlign: 'center',
    // marginTop: hp(8),
  },
  subfontStyle: {
    fontSize: normalize(14),
    // fontFamily: font.robotoBold,
    textAlign: 'center',
    marginLeft: wp(1),
    color: color.blue,
    marginTop: wp(2),
  },
});
export default EditData;
