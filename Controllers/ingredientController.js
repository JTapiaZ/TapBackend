const {Ingredient} = require('../Db');


exports.ingredient_create = function(req, res) {
    // ------------------ Validate Request ----------------- //
    if (!req.body.name || !req.body.quantity) {
        return res.status(400).send({
            success: false,
            message: "Please complete all required fields"
        });
    }


    // Create a ingredient
    let ingredient = new Ingredient(
        ({ name, quantity } = req.body)
    );

    // ------------- save ingredient in the database -----------
    ingredient
        .save()
        .then(data => {
            res.send({
                success: true,
                message: "Ingredient saved successfully",
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

// ------------- retrieve and return all ingredients ------------------
exports.all_ingredient = (req, res) => {
    Ingredient.findAll()
        .then(data => {
            var message = "";
            if (data === undefined || data.length == 0) message = "Ingredient not found";
            else message = "Ingredient found";
            res.json({
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


// --------- find a ingredient by id -------------
exports.ingredient_details = (req, res) => {
    Ingredient.findByPk(req.params.id)
        .then(data => {
            if (!data) {
                return res.status(404).send({
                    success: false,
                    message: "Ingredient not found with id: " + req.params.id
                });
            }
            res.send({
                success: true,
                message: "Ingredient found",
                data: data
            });
        })
        .catch(err => {
            if (err.kind === "ObjectId") {
                return res.status(404).send({
                    success: false,
                    message: "Ingredient not found with id:  " + req.params.id
                });
            }
            return res.status(500).send({
                success: false,
                message: "Error ocurred"
            });
        });
};

// --------- find a ingredient by id and update -------------
 exports.ingredient_update = (req, res) => {
    if (!req.body.name) {
      return res.status(400).send({
        success: false,
        message: "Please enter a full name"
      });
    }
  
    // find ingredient and update
    Ingredient.update({id: req.params.id, name: req.body.name, quantity: req.body.quantity},{where: {id: req.body.id}})
      .then(data => {
        if (!data) {
          return res.status(404).send({
            success: false,
            message: "Ingredient not found with id: " + req.params.id
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
            message: "Ingredient not found with id: " + req.params.id
          });
        }
        return res.status(500).send({
          success: false,
          message: "Error ocurred " + err
        });
      });
  };

// delete a ingredient with id.
exports.ingredient_delete = (req, res) => {
    Ingredient.destroy({ where: { ingredient_id : req.body.id }})
        .then(data => {
            if (!data) {
                return res.status(404).send({
                    success: false,
                    message: "Ingredient not found with id: " + id
                });
            }
            res.send({
                success: true,
                message: "Ingredient deleted successfully"
            });
        })
        .catch(err => {
            if (err.kind === "ObjectId" || err.name === "NotFound") {
                return res.status(404).send({
                    success: false,
                    message: "Ingredient not found with id: " + name
                });
            }
            return res.status(500).send({
                success: false,
                message: "Error ocurred"
            });
        });
};