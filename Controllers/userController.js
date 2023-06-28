const {User} = require('../Db');


// ------------- retrieve and return all users ------------------
exports.all_users = (req, res) => {
    User.findAll()
        .then(data => {
            var message = "";
            if (data === undefined || data.length == 0) message = "Persons not found!";
            else message = "Persons found";
            res.send({
                success: true,
                message: message,
                data: data
            });
        })
        .catch(err => {
            res.status(500).send({
                success: false,
                message: err.message || "Error ocurred"
            });

        });
};


// --------- find a user by id -------------
exports.user_details = (req, res) => {
    User.findByPk(req.params.id)
        .then(data => {
            if (!data) {
                return res.status(404).send({
                    success: false,
                    message: "Persons not found with id: " + req.params.id
                });
            }
            res.send({
                success: true,
                message: "Persons found",
                data: data
            });
        })
        .catch(err => {
            if (err.kind === "ObjectId") {
                return res.status(404).send({
                    success: false,
                    message: "Persons not found with id: " + req.params.id
                });
            }
            return res.status(500).send({
                success: false,
                message: "error ocurred"
            });
        });
};

// delete a user with the specified id.
exports.user_delete = (req, res) => {
    User.destroy({ where: { id : req.params.id }})
        .then(data => {
            if (!data) {
                return res.status(404).send({
                    success: false,
                    message: "Persons not found with name: " + name
                });
            }
            res.send({
                success: true,
                message: "Person eliminated successfully"
            });
        })
        .catch(err => {
            if (err.kind === "ObjectId" || err.name === "NotFound") {
                return res.status(404).send({
                    success: false,
                    message: "Persons not found with name: " + name
                });
            }
            return res.status(500).send({
                success: false,
                message: "Error ocurred"
            });
        });
};