import Category from "../models/Category.js";
import Tag from "../models/Tag.js";
import customError from "../utils/customError.js";

async function createTag (req, res){
    try {
        const tag = await Tag.create({
            name:req.body.name,
            category:req.body.category
        })
        return res.status(200).json(tag);
    } catch (error) {
        console.log(error);
        return res.status(500).json(error);
    }
}
async function deleteTag (req, res){
    try {
        if(!req.params.tagID){
            throw new customError("the tagID is missing from the request", 400);
        }
        const tag = await Tag.findByIdAndDelete(req.params.tagID);
        if(!tag){
            throw new customError("no tag was found with that ID",400);
        }
        return res.status(200).json({msg: "the tag was deleted"});
    } catch (error) {
        if(error instanceof customError)
            return res.status(error.statusCode).json({msg: error.message});
        console.log(error);
        return res.status(500).json(error);
    }
}

async function getAllTags (req, res){
    try {
        const tags = await Tag
            .find({})
            .populate({path: "category", select: ["_id","name","count"]})
            .select("-__v");
        return res.status(200).json(tags)
    } catch (error) {
        console.log(error);
        return res.status(500).json(error);
    }
}


async function getTagsOfCategory (req, res){
    try {
        const tags = await Tag.find({category: req.params.categoryID});

        
    } catch (error) {
        console.log(error);
        return res.status(500).json(error);
    }
}

async function getTagsGroupedByCategory(req, res){
    try {
        const categoriesWithTags = await Category.aggregate([
            {
              $lookup: {
                from: 'tags',
                let: { categoryId: '$_id' },
                pipeline: [
                  {
                    $match: {
                      $expr: { $eq: ['$category', '$$categoryId'] },
                    },
                  },
                  {
                    $project: {
                      _id: 1,
                      name: 1,
                    },
                  },
                ],
                as: 'tags',
              },
            },
          ]);
        return res.status(200).json(categoriesWithTags);
    } catch (error) {
        console.log(error);
        return res.status(500).json(error);
    }
}




export { createTag, deleteTag, getAllTags, getTagsOfCategory, getTagsGroupedByCategory };