import AsyncStorage from '@react-native-async-storage/async-storage';

//region AsyncStorage
export const storeInAsync = async (key, value) => {
    try {
        await AsyncStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
        // Error saving data
        console.log("Saving error : ",error);
    }
};

export const getFromAsync = async (key, callBack) => {
    try {
        const value = await AsyncStorage.getItem(key);
        if (value !== null) {
            // We have data!!
            callBack(JSON.parse(value));
        }else{
            callBack(null);
        }
    } catch (error) {
        // Error retrieving data
        console.log('Error : ', error);
    }
};
export const removeAsync = async (key) => {
    try {
        await AsyncStorage.removeItem(key);
        return true;
    }
    catch(exception) {
        return false;
    }
};
//endregion
