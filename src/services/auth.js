const LOGGED_USER = "LoggedUser"

export default {
    saveSession(data){
        sessionStorage.setItem(LOGGED_USER, JSON.stringify(data));
    },

    logout() {
        return sessionStorage.removeItem(LOGGED_USER);
    },

    getUserData() {
        return JSON.parse(sessionStorage.getItem(LOGGED_USER))
    },

    getToken() {
        return JSON.parse(sessionStorage.getItem(LOGGED_USER)).access_token
    },

    loggedIn() {

        return !!sessionStorage.getItem(LOGGED_USER);
    }
};