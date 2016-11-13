var helper = require("./../helper.js").helper;
var dal = require('./../dal.js').dal();

exports.write = function (app) {

    app.post('/posts/:category/:unixDate', function (req, res) {
        var body = req.body;
        console.log(body.subject);

        var item = {
            category: String(req.params.category),
            unixDate: Number(req.params.unixDate),

            date: String(body.date === undefined ? helper.getFormattedDate() : body.date),
            subject: String(body.subject),
            body: String(body.body),
            tags: body.tags
        };

        console.log(item);

        dal.insertPost(item, function (data, err) {
            if (err) res.status(500).send("An internal server error occurred");
            else return res.send(data);
        });

    });

    app.delete('/posts/:category/:unixDate', function (req, res) {

        var category = String(req.params.category);
        var unixDate = Number(req.params.unixDate);

        dal.deletePost(category, unixDate, function (data, err) {
            if (err) res.status(500).send("An internal server error occurred");
            else return res.send(data);
        });
    });
}