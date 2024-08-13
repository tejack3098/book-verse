export default {
    versionKey: false, // Disable the version key (__v)
    id: true, // Ensure id field is present
    toJSON: {
        transform(doc, ret){
            ret.id = ret._id; // Rename _id to id
            delete ret._id; // Remove _id field
        }
    }
}