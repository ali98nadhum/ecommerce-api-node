const { OrderModel } = require("../../model/OrderModel");

const generateOrderCode = async (userName) => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const tomorrow = new Date(today);
  tomorrow.setDate(today.getDate() + 1);

  const ordersTodayCount = await OrderModel.countDocuments({
    createdAt: { $gte: today, $lt: tomorrow },
  });

  const year = String(today.getFullYear()).slice(-2);
  const day = String(today.getDate()).padStart(2, '0');
  const firstLetter = userName?.[0]?.toUpperCase() || "X";
  const countPart = String(ordersTodayCount + 1).padStart(3, '0');

  return `${firstLetter}${year}${day}-${countPart}`;
};

module.exports = generateOrderCode;
