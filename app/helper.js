exports.helper = {

    getUnixByPage: (page, days) => {
        var today = (new Date).getTime();
        var daysBack = days * page;
        return today - (daysBack * 24 * 3600 * 1000);
    },

    getFormattedDate: () => {
        var d = new Date();
        return (
            ("00" + (d.getMonth() + 1)).slice(-2) + "/" +
            ("00" + d.getDate()).slice(-2) + "/" +
            d.getFullYear() + " " +
            ("00" + d.getHours()).slice(-2) + ":" +
            ("00" + d.getMinutes()).slice(-2) + ":" +
            ("00" + d.getSeconds()).slice(-2)
        );
    },

    handleResponse: (callback) => {
        return function (err, data) {
            if (err) callback(null, err);
            else callback(data);
        }
    }

}