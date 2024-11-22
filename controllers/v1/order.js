const { Order, OrderItem, Seller, Product } = require("../../db");
const { createPaginationData } = require("../../utils/paginationData");
const { updateOrderValidator } = require("../../validators/order");

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

    return res.status(200).json({
      orderItems,
      pagination: createPaginationData(
        page,
        limit,
        orderItems.length,
        "Orders"
      ),
    });
  } catch (error) {
    next(error);
  }
};

exports.edit = async (req, res, next) => {
  try {
    const { status, postTrackingCode } = req.body;
    const { id } = req.params;

    if (id === undefined || id === null || id === "" || isNaN(id)) {
      return res.status(422).json({ message: "id is not valid" });
    }

    await updateOrderValidator.validate(req.body, { abortEarly: false });

    const order = await Order.findOne({ where: { id } });
    if (!order) {
      return res.status(404).json({ message: "not found order" });
    }

    (order.status = status), (order.postTrackingCode = postTrackingCode);
    await order.save();

    return res.status(200).json({ message: "order updated successfully" });
  } catch (error) {
    next(error);
  }
};
