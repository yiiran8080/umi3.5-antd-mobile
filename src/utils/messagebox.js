import { Button, Space, Toast, Modal } from 'antd-mobile';

export function successMessagebox(mgs) {
  Toast.show({
    icon: 'success',
    content: mgs,
  });
}
export function errorMessagebox(mgs) {
  Modal.alert({
    content: mgs,
    onConfirm: () => {
      // console.log('Confirmed')
    },
  });
}
export function errorInfo(mgs) {
  Modal.alert({
    content: mgs,
    onConfirm: () => {
      // console.log('Confirmed')
    },
  });
}
export function warningMessagebox(mgs) {
  Modal.alert({
    content: mgs,
    onConfirm: () => {
      // console.log('Confirmed')
    },
  });
}
