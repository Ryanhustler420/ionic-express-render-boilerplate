// NOTE:
// Run this when you want to deploy this react app somewhere else
// where same domain has no express server

// Get command-line arguments
const args = process.argv.slice(2);
// Define named arguments
const namedArgs = {};

// Process named arguments
args.forEach((arg) => {
  const [name, value] = arg.split("=");
  if (name && value) namedArgs[name] = value;
});

// Validate arguments
const validateArguments = () => {
  if (!namedArgs["--host"] && !namedArgs["-h"])
    throw new Error("Argument --host (-h) is required.");
  // if (!namedArgs["--url"] && !namedArgs["-u"])
  //   throw new Error("Argument --url (-u) is required.");
};

try {
  // Validate arguments before accessing them
  validateArguments();

  // Access named arguments
  const host = namedArgs["--host"] || namedArgs["-h"];
  // const arg2 = namedArgs["--url"] || namedArgs["-u"];

  // Output the arguments
  const env = `REACT_APP_SERVER_HOST_URL=${host}
REACT_APP_VERSION=v1
EXTRA=12
`;

  require("fs").writeFileSync(".env", env, "utf8");
} catch (error) {
  console.error("Error:", error.message);
  process.exit(1); // Exit the process with an error code
}
