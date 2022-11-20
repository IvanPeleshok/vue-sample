const formater = new Intl.NumberFormat("ru-RU", { currency: "RUB", style: "currency" });

export function currency(value: number) {
    return formater.format(value);
}
