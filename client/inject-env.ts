// NOTE:
// Run this when you want to deploy this react app somewhere else
// where same domain has no express server

const env = `
REACT_APP_SERVER_HOST_URL=https://google.com
REACT_APP_VERSION=v1
`;

require("fs").writeFileSync(".env", env, "utf8");