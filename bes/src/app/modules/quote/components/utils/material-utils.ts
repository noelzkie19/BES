
export const gtsComputation = (quantity: number, unitPrice: number, gst: boolean) => {
    const addons = gst ? (quantity * unitPrice) * 0.1 : 0;
    const total = (quantity * unitPrice) + addons
    return total
}
