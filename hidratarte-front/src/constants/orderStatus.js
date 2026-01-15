// src/constants/orderStatus.js
export const ORDER_STATUS = {
  PENDING: ["pending", "pendiente"],
  ACCEPTED: [
    "accepted",
    "aceptado",
    "confirmado",
    "pago_recibido",
    "processing",
    "en_proceso",
    "en proceso",
  ],
  PREPARING: ["preparing", "en_preparacion", "en preparación", "en-preparacion"],
  SHIPPED: ["shipped", "enviado"],
  DELIVERED: ["delivered", "entregado"],
  CANCELED: ["cancelled", "canceled", "cancelado"],
};

const STATUS_ORDER = [
  "PENDING",
  "ACCEPTED",
  "PREPARING",
  "SHIPPED",
  "DELIVERED",
  "CANCELED",
];

export function normalizeOrderStatus(raw) {
  if (!raw || typeof raw !== "string") return "PENDING";
  const val = raw.toString().trim().toLowerCase().replace(/\s+/g, "_");
  for (const key of Object.keys(ORDER_STATUS)) {
    if (ORDER_STATUS[key].some((s) => s.toLowerCase() === val)) {
      return key;
    }
  }
  return "PENDING";
}

export const STATUS_BADGE = {
  PENDING: "warning",
  ACCEPTED: "success",
  PREPARING: "info",
  SHIPPED: "primary",
  DELIVERED: "secondary",
  CANCELED: "danger",
};

export const STATUS_LABEL_ES = {
  PENDING: "pendiente",
  ACCEPTED: "aceptado",
  PREPARING: "en preparación",
  SHIPPED: "enviado",
  DELIVERED: "entregado",
  CANCELED: "cancelado",
};

export function statusOrderIndex(normalized) {
  const idx = STATUS_ORDER.indexOf(normalized);
  return idx === -1 ? 0 : idx;
}
