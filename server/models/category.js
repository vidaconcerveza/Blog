import mongoose from 'mongoose'

const CategorySchema = new mongoose.Schema({
    categoryName: {
        type: String,
        default: "Unclassified"
    },
    posts: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "post"
    }]
})

const Category = mongoose.model('category', CategorySchema)

export default Category;