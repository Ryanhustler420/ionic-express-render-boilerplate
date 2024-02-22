const backend = process.env.REACT_APP_SERVER_BACKEND_URL || ''; // proxy
export const routes = {
  GET_CURRENT_USER: `${backend}api/auth/currentuser`,
};