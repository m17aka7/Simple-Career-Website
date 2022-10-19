export function getUserData() {
    const user = sessionStorage.getItem('userData');
    if(user) {
        return JSON.parse(user);
    } else {
        return undefined;
    }
}

export function setUserData(data) {
    sessionStorage.setItem('userData', JSON.stringify(data))
} 

export function clearUserData() {
    sessionStorage.removeItem('userData')
}