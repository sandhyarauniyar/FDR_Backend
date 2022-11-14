const fdrServices = require("../services/fdrService");

const fdrByAddress = async (req, res) => {
    const address = req?.params?.address;

    if (!address) {
        res.status(422).json({ message: "Please send a valid address." });
    }

    let point;
    try {
        point = await fdrServices.PointsFromAddress(address);
    } catch (err) {
        return err;
    }

    const restaurant = fdrServices.restaurantForLL(point);
    if (restaurant === "not found") {
        res.status(404).json({ message: "Restaurant not found for your locality!" });
    }
    else {
        res.json({
            restaurant,
            message: "Found the Restaurant according to your address!",
        });
    }
};

exports.fdrByAddress = fdrByAddress;
