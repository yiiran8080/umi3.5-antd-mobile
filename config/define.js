const { APP_TYPE } = process.env;
let ENVType = 'product';
let API_SERVER = 'http://product';
let primaryColor = '#1e98c1';
if (APP_TYPE == 'dev') {
  ENVType = 'dev';
  API_SERVER = 'http://dev';
  primaryColor = 'orange';
} else if (APP_TYPE == 'test') {
  ENVType = 'test';
  API_SERVER = 'http://test';
  primaryColor = 'red';
}
export default {
  ENVType: ENVType,
  API_SERVER: API_SERVER,
  primaryColor: primaryColor,
};
