import { useJsApiLoader } from '@react-google-maps/api';

const useGoogleMapsLoader = () => {
  return useJsApiLoader({
    googleMapsApiKey: 'YOUR_GOOGLE_MAPS_API_KEY', // Replace with your actual API key
    libraries: ['places'],
  });
};

export default useGoogleMapsLoader;
