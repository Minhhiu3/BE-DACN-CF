import Cart from "../cart/cart.model.js";

export const createCartForUser = async (userId) => {
    const cart = await Cart.create({
        user: userId,
        items: [],
    });
    return cart
};