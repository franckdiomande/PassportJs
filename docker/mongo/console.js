// mongo

module.exports = {

    questions: [
        {
            message: "Database name",
            name: "database_name",
            default: "skyflow",
        },
        {
            message: "Database user",
            name: "user",
            default: "skyflow",
        },
        {
            message: "Database password",
            name: "password",
            default: "root",
        },
        {
            message: "Application port",
            name: "port",
            default: "27017",
            validator: (value)=>{
                if(Skyflow.isPortReachable(value)){
                    return "This port is not available."
                }
                Skyflow.addDockerPort(value);
                return true
            }
        },
        {
            message: "Database storage location. Relative to the current directory.",
            name: "database_storage_location",
            default: "./skyflow/database/mongo",
        },
    ],

    messages: {
        writeln: [
            'Database information:',
            'Host: {{ container_name }}',
            'Database name: {{ database_name }}',
            'User: {{ user }}',
            'Password: {{ password }}',
        ],
    }

};
