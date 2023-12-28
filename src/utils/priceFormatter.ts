export const priceFormatter = (currency: "USD" | "HUF") =>
  new Intl.NumberFormat(currency === "HUF" ? "en-HU" : "en-US", {
    style: "currency",
    currency: currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  });
