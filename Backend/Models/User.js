const moongoose = require('mongoose');
const dotenv = require("dotenv")
const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken");
dotenv.config()

const userSchema = moongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
    },
    tokens: [{
        token: {
            type: String,
            required: true,
        }
    }],
    isverified: {
        type: String,
        default: false
    }
});

userSchema.methods.genrateToken = async function () {
    try {
        const token = await jwt.sign({ _id: this._id }, process.env.SECRET_KEY);
        return token;
    } catch (error) {
        console.log("error", error);

    }

}

userSchema.pre("save", async function (next) {
    if (this.isModified("password")) {
        this.password = await bcrypt.hash(this.password, 10);
        const token = await this.genrateToken();
        this.tokens = this.tokens.concat({ token: token });
    }
    next();
})

const User = new moongoose.model("user", userSchema);
module.exports = User