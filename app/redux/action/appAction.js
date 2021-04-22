import {LOADING, SET_USER_LIST} from '../types';
import {
  createUserEntryOnFireStore,
  deleteDataFromFireStore,
  editDataOnFirestore,
  getAllData,
} from '../../helper/firebaseMethodHelper';

export const setLoaderStatus = status => {
  return dispatch => {
    dispatch({type: LOADING, payload: status});
  };
};
export const setUserListData = () => {
  return dispatch => {
    dispatch({type: LOADING, payload: true});
    getAllData().then(userList => {
      dispatch({type: LOADING, payload: false});
      dispatch({type: SET_USER_LIST, payload: userList});
    });
  };
};

export const addData = userData => {
  return dispatch => {
    dispatch({type: LOADING, payload: true});
    createUserEntryOnFireStore(userData).then(isAdded => {
      if (isAdded) {
        return Promise.resolve(true);
      } else {
        return Promise.resolve(false);
      }
    });
  };
};

export const deleteData = docId => {
  return dispatch => {
    dispatch({type: LOADING, payload: true});
    deleteDataFromFireStore(docId).then(isDeleted => {
      if (isDeleted) {
        return Promise.resolve(true);
      } else {
        return Promise.resolve(false);
      }
    });
  };
};

export const editData = userData => {
  return dispatch => {
    dispatch({type: LOADING, payload: true});
    editDataOnFirestore(userData).then(isEdited => {
      if (isEdited) {
        return Promise.resolve(true);
      } else {
        return Promise.resolve(false);
      }
    });
  };
};
