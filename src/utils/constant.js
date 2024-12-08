import { Dimensions } from 'react-native';


export const ROLE = {
    USER: "USER",
    STAFF: "STAFF",
}
export const REVIEW_TEXT = [
    '',
    'Trải nghiệm tệ',
    'Trải nghiệm không tốt',
    'Trải nghiệm trung bình',
    'Trải nghiệm tốt',
    'Trải nghiệm tuyệt vời',
  ];
export const RES_STATUS  = {
    PENDING: "PENDING",
    CHECKED_IN: "CHECKED_IN",
    CHECKED_OUT: "CHECKED_OUT",
    CANCELLED: "CANCELLED",
}
export const URL_API = '192.168.150.104:8080';
export const SCREEN_HEIGHT = Dimensions.get('window').height;
export const SCREEN_WIDTH = Dimensions.get('window').width;

