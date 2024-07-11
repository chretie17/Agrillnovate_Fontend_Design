// services/GoogleMapsService.js
import { Loader } from '@googlemaps/js-api-loader';

const API_KEY = 'AIzaSyAwSoEbsNk6EWrGdcaLPUxyp2FPUJ5eBQg';

const loader = new Loader({
  apiKey: API_KEY,
  version: 'weekly',
  libraries: ['places']
});

export const loadGoogleMaps = () => {
  return loader.load();
};
