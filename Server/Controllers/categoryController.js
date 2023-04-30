import Category from "../models/Category.js";


async function getAllCategories (req, res){
    try{
        const categories = await Category.find().select("-__v");;
        return res.status(200).json(categories);
    }catch(err){
        console.log(err);
        return res.status(400).json(err);
    }
}

export { getAllCategories };
