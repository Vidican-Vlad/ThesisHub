import comment from "../models/Comment.js"

const updateComment = async () =>{
    try{
        await comment.bulkWrite([
            {
                updateMany: {
                    filter: {postedAt: {$exists: false}},
                    update: {$set: {postedAt: Date.now()}},
                }
            }
        ]);
        console.log('Default values updated successfully.');
    }catch(err){
        console.error(err);
    }
}

updateComment();