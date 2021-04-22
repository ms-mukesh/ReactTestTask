import storage from '@react-native-firebase/storage';
import firestore from '@react-native-firebase/firestore';
export const getUserDataFromFirebase = emailId => {
  return new Promise(async resolve => {
    firestore()
      .collection('Users')
      .where('email', '==', emailId)
      .get()
      .then(querySnapshot => {
        if (querySnapshot._docs.length > 0) {
          resolve(querySnapshot._docs);
        } else {
          resolve(false);
        }
      })
      .catch(err => {
        resolve(false);
      });
  });
};

export const getAllData = () => {
  return new Promise(async resolve => {
    firestore()
      .collection('Empolyee')
      .get()
      .then(querySnapshot => {
        if (querySnapshot._docs.length > 0) {
          resolve(querySnapshot._docs);
        } else {
          resolve(false);
        }
      })
      .catch(err => {
        resolve(false);
      });
  });
};
export const createUserEntryOnFireStore = userData => {
  return new Promise(async resolve => {
    firestore()
      .collection('Empolyee')
      .add({
        name: userData.empName,
        designation: userData.designation,
        phoneNumber: userData.phoneNo,
        salary: userData.salary,
      })
      .then(() => {
        console.log('User added!');
        resolve(true);
      })
      .catch(err => {
        console.log('error while adding new user...', err);
      });
  });
};
export const editDataOnFirestore = userData => {
  return new Promise(async resolve => {
    console.log('data--', userData);
    firestore()
      .collection('Empolyee')
      .doc(userData.dataId)
      .update({
        name: userData.empName,
        designation: userData.designation,
        phoneNumber: userData.phoneNo,
        salary: userData.salary,
      })

      .then(() => {
        console.log('User Edited!');
        resolve(true);
      })
      .catch(err => {
        console.log('error while editing new user...', err);
      });
  });
};

export const deleteDataFromFireStore = docId => {
  return new Promise(async resolve => {
    firestore()
      .collection('Empolyee')
      .doc(docId)
      .delete()

      .then(() => {
        console.log('User delete!');
        resolve(true);
      })
      .catch(err => {
        console.log('error while delete...', err);
      });
  });
};
