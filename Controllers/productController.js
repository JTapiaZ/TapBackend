const {Product} = require('../Db');


exports.product_create = function(req, res) {
    // ------------------ Validate Request ----------------- //
    if (!req.body.name || !req.body.description || !req.body.price || !req.body.ingredient_id) {
        return res.status(400).send({
            success: false,
            message: "Please complete all required fields"
        });
    }


    // Create a product
    let product = new Product(
        ({ name, description, price, ingredient_id } = req.body)
    );

    // ------------- save user in the database -----------
    product
        .save()
        .then(data => {
            res.send({
                success: true,
                message: "Product saved successfully",
                data: data
            });
        })
        .catch(err => {
            res.status(500).send({
                success: false,
                message: err.message || "Error ocurred",
            });
            console.log(err);
        })
}

// ------------- retrieve and return all products ------------------
exports.all_products = (req, res) => {
    Product.findAll()
        .then(data => {
            var message = "";
            if (data === undefined || data.length == 0) message = "Products not found";
            else message = "Products found";
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


// --------- find a product by id -------------
exports.product_details = (req, res) => {
    Product.findByPk(req.params.id)
        .then(data => {
            if (!data) {
                return res.status(404).send({
                    success: false,
                    message: "Product not found with id: " + req.params.id
                });
            }
            res.send({
                success: true,
                message: "Product found",
                data: data
            });
        })
        .catch(err => {
            if (err.kind === "ObjectId") {
                return res.status(404).send({
                    success: false,
                    message: "Product not found with id:  " + req.params.id
                });
            }
            return res.status(500).send({
                success: false,
                message: "Error ocurred"
            });
        });
};

// --------- find a product by id and update -------------
 exports.product_update = (req, res) => {
    if (!req.body.name) {
      return res.status(400).send({
        success: false,
        message: "Please enter a full name"
      });
    }
  
    // find natural and update
    Product.update({id: req.params.id, name: req.body.name, description: req.body.description, price: req.body.price, ingredient_id: req.body.ingredient_id},{where: {id: req.body.id}})
      .then(data => {
        if (!data) {
          return res.status(404).send({
            success: false,
            message: "Product not found with id: " + req.params.id
          });
        }
        res.send({
          success: true,
          data: data
        });
      })
      .catch(err => {
        if (err.kind === "ObjectId") {
          return res.status(404).send({
            success: false,
            message: "Product not found with id: " + req.params.id
          });
        }
        return res.status(500).send({
          success: false,
          message: "Error ocurred " + err
        });
      });
  };

// delete a product with id.
exports.product_delete = (req, res) => {
    Product.destroy({ where: { id : req.params.id }})
        .then(data => {
            if (!data) {
                return res.status(404).send({
                    success: false,
                    message: "Product not found with id: " + id
                });
            }
            res.send({
                success: true,
                message: "Product deleted successfully"
            });
        })
        .catch(err => {
            if (err.kind === "ObjectId" || err.name === "NotFound") {
                return res.status(404).send({
                    success: false,
                    message: "Product not found with id: " + name
                });
            }
            return res.status(500).send({
                success: false,
                message: "Error ocurred"
            });
        });
};