const mongoose = require('mongoose')

const userSchema = new mongoose.Schema(
    {
        name: String,
        email: String,
        password: String,
        tasks: [
            {
                title: String,
                description: String,
                date: Date,
                status: String,
                user: String
            }
        ]
    },
    { timestamps: true }
);

userSchema.method("toJSON", function () {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
});

module.exports = mongoose.model('User', userSchema);