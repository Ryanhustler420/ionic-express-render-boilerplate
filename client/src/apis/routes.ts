const backend = process.env.REACT_APP_SERVER_BACKEND_URL || ''; // proxy
const monolithic = process.env.REACT_APP_SERVER_MONOLITHIC_URL || 'http://localhost:8087/';

export const routes = {
  GET_CURRENT_USER: `${monolithic}api/auth/currentuser`,
};