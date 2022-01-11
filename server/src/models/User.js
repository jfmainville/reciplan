const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
		email: {
			type: String,
			unique: true,
			required: true
		},
		password: {
			type: String,
			required: true
		},
		lastLogin: {
			type: Date,
			default: Date.now()
		},
		active: {
			type: Boolean,
			default: true
		},
		subscriptionId: {
			type: String,
			// Default subscription (free)
			default: "3aefad4f-b4c4-43b4-b821-86d02be8c8ec"
		}
	},
	{
		timestamps: true
	}
);

userSchema.pre("save", function (next) {
	const user = this;
	if (!user.isModified("password")) {
		return next;
	}

	bcrypt.genSalt(10, (err, salt) => {
		if (err) {
			return next(err);
		}

		bcrypt.hash(user.password, salt, (err, hash) => {
			if (err) {
				return next(err);
			}

			user.password = hash;
			next();
		});
	});
});

userSchema.methods.comparePassword = function (candidatePassword) {
	const user = this;

	return new Promise((resolve, reject) => {
		bcrypt.compare(candidatePassword, user.password, (err, isMatch) => {
			if (err) {
				return reject(err);
			}

			if (!isMatch) {
				return reject(false);
			}

			resolve(true);
		});
	});
};

mongoose.model("User", userSchema);