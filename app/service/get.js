
var helper = require("./../helper.js").helper;
var dal = require('./../dal.js').dal();
var config = require("./../../config/config.js").config;

exports.get = function (app) {
    app.get('/posts/:category/:unixDate', function (req, res) {
        var category = req.params.category;
        var unixDate = req.params.unixDate;

        dal.getPost(category, unixDate, function (data, err) {
            if (err) res.status(500).send("An internal server error occurred");
            else return res.send(data);
        });

    });

    app.get('/posts/:category/page/:page', function (req, res) {
        var category = req.params.category;
        var page = req.params.page;

        var startDate = helper.getUnixByPage(page, config.blog.previewCategoryDays);
        var endDate = helper.getUnixByPage(page - 1, config.blog.previewCategoryDays);

        dal.getPosts(category, startDate, endDate, function (data, err) {
            if (err) res.status(500).send("An internal server error occurred");
            else return res.send(data);
        });
    });

    app.get('/allposts/page/:page', function (req, res) {
        console.log("yolo!");
        var page = req.params.page;

        var startDate = helper.getUnixByPage(page, config.blog.previewDays);
        var endDate = helper.getUnixByPage(page - 1, config.blog.previewDays);

        // used to keep track of item results, any errors, number of category iterations 
        var items = [];
        var error;
        var count = config.blog.categories.length;
        var i = 0;

        function handleResponse(data, err) {
            if (err) error = err;
            data.Items.forEach((item) => {
                console.log(item);
                items.push(item);
            });

            if (++i === count) {
                if (error) res.status(500).send("An internal server error occurred");
                else res.send(items);
            }
        }

        config.blog.categories.forEach((category) => {
            console.log(category);
            dal.getPosts(category, startDate, endDate, handleResponse);
        });

    });
}