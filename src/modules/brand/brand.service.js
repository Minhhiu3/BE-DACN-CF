import Category from "./brand.model.js";
const findByIdBrand = async (id) => {
    const data = await Category.findById(id)
    if (data) return data
}

export default findByIdBrand;