const {resolve} = require("path");

// node

module.exports = {

    questions: [
        {
            message: "Host name",
            name: "host",
            default: "localhost",
        },
        {
            message: "Application port",
            name: "port",
            default: "9000",
            validator: (value) => {
                if (Skyflow.isPortReachable(value)) {
                    return "This port is not available."
                }
                Skyflow.addDockerPort(value);
                return true
            }
        },
        {
            message: "Node environment. Set dev or prod",
            name: "env",
            default: "dev",
            validator: (value) => {
                if (value !== "dev" && value !== "prod") {
                    return "Your environment is not valid. Use dev or prod."
                }

                return true
            }
        },
    ],

};
