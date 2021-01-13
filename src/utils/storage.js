import AsyncStorage from '@react-native-async-storage/async-storage';

const key_user_details = '@user_details';
const key_user_token = '@user_details_token';

const storeUserData = async (data) => {
  return storeData(key_user_details, JSON.stringify(data));
};

const getUserData = async () => {
  let data = await getData(key_user_details);
  if (data) {
    data = JSON.parse(data);
  }
  return data;
};

const storeData = async (key, value) => {
  try {
    await AsyncStorage.setItem(key, value);
    return;
  } catch (e) {
    // saving error
  }
};

const getData = async (key) => {
  try {
    const value = await AsyncStorage.getItem(key);
    if (value !== null) {
      // value previously stored
    }
    return value;
  } catch (e) {
    // error reading value
  }
};

export {
  storeData,
  getData,
  key_user_details,
  key_user_token,
  getUserData,
  storeUserData,
};
