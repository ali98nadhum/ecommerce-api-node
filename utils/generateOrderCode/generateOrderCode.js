const { OrderModel } = require("../../model/OrderModel");

const generateOrderCode = async () => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const tomorrow = new Date(today);
  tomorrow.setDate(today.getDate() + 1);

  const ordersTodayCount = await OrderModel.countDocuments({
    createdAt: { $gte: today, $lt: tomorrow },
  });

  const datePart = today.toISOString().split('T')[0].replace(/-/g, '');
  const countPart = String(ordersTodayCount + 1).padStart(3, '0');

  return `ORD-${datePart}-${countPart}`;
};

module.exports = generateOrderCode;
