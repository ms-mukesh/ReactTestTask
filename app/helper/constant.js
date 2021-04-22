import {hp, wp} from './themeHelper';

export const ASPECT_RATIO = wp(1) / hp(1);
export const LATITUDE_DELTA = 0.0922;
export const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;
export const API_KEY = '3e1bb7aeefc606bc43bd082eb6255607'
