export class LocalStorage {
    static LAST_CHANNEL_ID='LAST_CHANNEL_ID'
    static getStorage(useSession) {
        try {
            return useSession ? sessionStorage : localStorage;
        } catch (exception) {
            return null;
        }
    }

    static set(key, message, useSession) {
        try {
            const storage = LocalStorage.getStorage(useSession);
            storage.setItem(key, JSON.stringify(message));
        } catch (exception) {
            return false;
        }
        return true;
    }

    static get(key, useSession=false) {
        try {
            const storage = LocalStorage.getStorage(useSession);
            const message = storage.getItem(key);
            if (message) {
                return JSON.parse(message);
            }
        } catch (exception) {
            return null;
        }
    }

    static getWithDefault(key, useSession=false, defaultValue) {
        try {
            const storage = LocalStorage.getStorage(useSession);
            const message = storage.getItem(key);
            if (message) {
                return JSON.parse(message);
            }
        } catch (exception) {
            return defaultValue;
        }
    }
    static remove(key, useSession) {
        try {
            const storage = LocalStorage.getStorage(useSession);
            storage.removeItem(key);
        } catch (exception) {
            console.log(exception);
            // continue regardless of errors
        }
    }
}