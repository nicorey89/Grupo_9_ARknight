const { Orden } = require("../database/models/Orden");

const getOrders = async () => {
  return await Orden.findAll();
};

const getOrderById = async (id) => {
  return await Orden.findByPk(id);
};

const getOrderByUser = (userId) => {
  return Orden.findOne({
    where: {
      userId,
    },
    include: [
      { association: "orden_items", include: [{ association: "products" }] },
    ],
  });
};

const insertOrder = async (data) => {
    try {
        return await Orden.create(data);
    } catch (error) {
        console.error("Error while fetching order :", error);
        throw new Error("Error fetching order ");
    }
};

const updateOrder = async (data, Id) => {
    try {
        return await Orden.create(data, {
            where: {
                id: Id
            }
        });
    } catch (error) {
        console.error("Error while fetching order :", error);
        throw new Error("Error fetching order ");
    }
};

const deleteOrder = async (id) => {
    try {
        return await Orden.destroy({
            where: {
                id
            }
        });
    } catch (error) {
        console.error("Error while fetching order :", error);
        throw new Error("Error fetching order ");
    }
};

module.exports = {
  getOrders,
  getOrderById,
  getOrderByUser,
  insertOrder,
  updateOrder,
  deleteOrder
};
