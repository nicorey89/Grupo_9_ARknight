const { Orden_item } = require("../database/models/Orden_item");

const getOrdersItems = async () => {
  try {
    return await Orden_item.findAll();
  } catch (error) {
    console.error("Error while fetching order item:", error);
    throw new Error("Error fetching order item");
  }
};

const getOrderItemById = async (id) => {
  try {
    return await Orden_item.findByPk(id);
  } catch (error) {
    console.error("Error while fetching order item:", error);
    throw new Error("Error fetching order item");
  }
};

const getOrderItemsByOrder = async (orderId) => {
  try {
    return await Orden_item.findAll({
      where: {
        orderId,
      },
      include: [{ association: "products" }],
    });
  } catch (error) {
    console.error("Error while fetching order item:", error);
    throw new Error("Error fetching order item");
  }
};

const insertOrderItem = async (data) => {
  try {
    return await Orden_item.create(data);
  } catch (error) {
    console.error("Error while fetching order item:", error);
    throw new Error("Error fetching order item");
  }
};

const updateOrderItem = async (data, itemId) => {
  try {
    return await Orden_item.update(data, {
      where: {
        id: itemId,
      },
    });
  } catch (error) {
    console.error("Error while updating order item:", error);
    throw new Error("Error updating order item");
  }
};

const deleteOrderItem = async (id) => {
  try {
    return await Orden_item.destroy({
      where: {
        id,
      },
    });
  } catch (error) {
    console.error("Error while deleting order item:", error);
    throw new Error("Error deleting order item");
  }
};

const bulkDeleteOrderItems = async (orderId) => {
  try {
    return await Orden_item.destroy({
      where: {
        orderId,
      },
    });
  } catch (error) {
    console.error("Error while deleting order items:", error);
    throw new Error("Error deleting order items");
  }
};

module.exports = {
  getOrdersItems,
  getOrderItemById,
  getOrderItemsByOrder,
  insertOrderItem,
  updateOrderItem,
  deleteOrderItem,
  bulkDeleteOrderItems
};
