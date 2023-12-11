import { getMe } from "../redux/features/authSlice";

export const getLocation = (setUserLocation, dispatch, setLoadingUser) => {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                const { latitude, longitude } = position.coords;
                setUserLocation([latitude, longitude])
            },
            (error) => {
                console.error('Error getting user location:', error);
            }
        )
    } else {
        console.error('Geolocation is not supported by this browser.');
    }

    dispatch(getMe())
    setLoadingUser(false);
}