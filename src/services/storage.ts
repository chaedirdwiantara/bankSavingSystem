import AsyncStorage from '@react-native-async-storage/async-storage';

export async function getData<T>(key: string): Promise<T | null> {
    try {
        const data = await AsyncStorage.getItem(key);
        return data ? JSON.parse(data) : null;
    } catch (error) {
        console.error(`Error getting data for key ${key}:`, error);
        return null;
    }
}

export async function setData<T>(key: string, value: T): Promise<void> {
    try {
        await AsyncStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
        console.error(`Error setting data for key ${key}:`, error);
        throw error;
    }
}

export async function removeData(key: string): Promise<void> {
    try {
        await AsyncStorage.removeItem(key);
    } catch (error) {
        console.error(`Error removing data for key ${key}:`, error);
        throw error;
    }
}

export async function clearAllData(): Promise<void> {
    try {
        await AsyncStorage.clear();
    } catch (error) {
        console.error('Error clearing all data:', error);
        throw error;
    }
}
