exports.config = {

    google: {
        username: ""  // google account for your admin user which can edit and post blogs
    },
    aws: {
        dynamo: {
            login: {
                accessKeyId: "your_key",
                secretAccessKey: "your_secret",
                region: "us-west-2",
                endpoint: "http://localhost:8000" // replace with your server, this is for testing
            },
            throughput: {
                ReadCapacityUnits: 10, 
                WriteCapacityUnits: 10
            },
            tableName: "Posts"
        },
    },
    blog: {
        // If no posts are done within these ranges, then text will show asking if you would like to pull back the next x days.
        previewDays: 90,        // number of days to load from dynamodb for all categories (makes calls to each category)
        previewCategoryDays: 365,  // number of days to load from dynamodb for a single category
        maxPostListing: 5,               // max number of posts to list at a time in the interface
        categories: ["Astronomy","Code","Writing","Art","Science"] // These are categories I use for my blog, replace with your own
    }
}