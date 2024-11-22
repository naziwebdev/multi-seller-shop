const { Order, OrderItem, Seller, Product } = require("../../db");
const {} = require("../../utils/paginationData");

exports.getAll = async (req, res, next) => {
  try {
    const user = req.user;
    const { page = 1, limit = 1 } = req.query;
    const offset = (page - 1) * limit;

    const filters = {
      ...(user.role.includes("admin") ? {} : { user_id: user.id }),
    };

    const orders = await Order.findAll({
      where: filters,
      offset: +offset,
      limit: +limit,
    });
    if (!orders) {
      return res.status(404).json({ message: "not found order" });
    }

    let orderItems = [];

    for (const order of orders) {
      orderItems = await OrderItem.findAll({
        where: { order_id: order.id },
        include: [
          {
            model: Seller,
            as: "seller",
          },
          {
            model: Product,
            as: "product",
          },
          {
            model: Order,
            as: "order",
          },
        ],
        offset: +offset,
        limit: +limit,
      });
    }

    orderItems = orderItems.map((item) => {
      item.order.shippingAddress = JSON.parse(item.order.shippingAddress);
      return item;
    });

    return res.status(200).json(orderItems);
  } catch (error) {
    next(error);
  }
};

exports.edit = async (req, res, next) => {
  try {
  } catch (error) {
    next(error);
  }
};
