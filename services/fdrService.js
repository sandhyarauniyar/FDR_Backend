const axios = require("axios");
const polygons = require("./../data/polygons");

const params = {
    access_key:
        process.env.POSITION_STACK_API_KEY ||
        "5c06b6d0ce92b9df6984eab33a5c239d",
    query: "1600 Pennsylvania Ave NW",
    limit: 1,
};

const PointsFromAddress = async (address) => {
    try {
        let response = await axios.get(
            "http://api.positionstack.com/v1/forward",
            {
                params: { ...params, query: address },
            }
        );
        const data = response?.data?.data?.[0];
        const ll = [data?.longitude, data?.latitude];

        return ll;
    } catch (err) {
        res.status(404).json({ message: "Something went wrong while reaching out to PositionStack for Longitude and Latitude!" });
    }
};

//Ray Casting Alogrithm 
const restaurantForLL = (point) => {

    const numberOfPolygons = polygons.length,
        y = point[0],
        x = point[1];

    let pointWithPolygon = false;

    for (let j = 0; j < numberOfPolygons; j++) {
        const n = polygons[j].coordinates.length;

        const polygon = polygons[j];

        for (let i = 0; i < n; i++) {
            const y1 = polygon.coordinates[i][0];
            const y2 = polygon.coordinates[(i + 1) % n][0];

            const x1 = polygon.coordinates[i][1];
            const x2 = polygon.coordinates[(i + 1) % n][1];

            if (
                y < y1 != y < y2 &&
                x < ((x2 - x1) * (y - y1)) / (y2 - y1) + x1
            ) {
                pointWithPolygon = !pointWithPolygon;
            }
        }

        if (pointWithPolygon) {
            return polygons[j].assignedRestaurant;
        }
    }
    return "not found";
};

module.exports.restaurantForLL = restaurantForLL;
module.exports.PointsFromAddress = PointsFromAddress;
