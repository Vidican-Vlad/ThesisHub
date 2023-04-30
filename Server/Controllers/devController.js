import Category from "../models/Category.js";
import Tag from "../models/Tag.js";


async function createTagsBulk(req, res){
    try{
        //for dev use only
        const categories = await Category.find();
        let tempCategory;
        const promises = req.body.tags.map(tag =>{
            tempCategory = categories.find(el => el.name === tag.category);
            if(tempCategory != undefined){
                return Tag.create(
                    {
                        name:tag.name,
                        category: tempCategory._id
                    }
                )
            }
        })
        await Promise.all(promises);
        return res.status(200).json({msg: "success"});
    }catch(err){
        console.log(err);
        return res.status(400).json(err);
    }
}

async function createCategoriesBulk(req, res){
    try {
        //for dev use only
        const promises = req.body.categories.map(category =>{
           return Category.create(
            {
                name: category
            }
           )
        })
        await Promise.all(promises);
        return res.status(200).json({msg: "success!"});
    } catch (err) {
        console.log(err);
        return res.status(400).json(err);
    }
}

export { createCategoriesBulk, createTagsBulk };