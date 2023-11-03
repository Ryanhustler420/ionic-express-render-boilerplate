import mongoose from "mongoose";
import { Password } from "../../services/password";
import { updateIfCurrentPlugin } from "mongoose-update-if-current";

// An interface that describe the properties
// that are required to create a new User
export interface UserAttrs {
  email: string;
  password: string;
  name: string;
  phone: string;
  avatar: string;
  address: string;
  is_banned?: boolean;
}

// An interface that describes the properties
// that a User Modal has
interface UserModel extends mongoose.Model<UserDoc> {
  build(attrs: UserAttrs): UserDoc;
  findByEvent(event: { id: string; version: number }): Promise<UserDoc | null>;
}

// An interface that describes the properties
// that a User Document has
export interface UserDoc extends mongoose.Document {
  email: string;
  password: string;
  name: string;
  phone: string;
  avatar: string;
  address: string;
  is_banned?: boolean;
  version: number;
  isBanned(): Promise<boolean>;
}

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    avatar: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    is_banned: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
  {
    toJSON: {
      transform(doc, ret) {
        ret.id = ret._id;
        delete ret._id;
        delete ret.password;
      },
    },
  }
);

userSchema.set("versionKey", "version");
userSchema.plugin(updateIfCurrentPlugin);

userSchema.statics.findByEvent = (event: { id: string; version: number }) => {
  return User.findOne({
    _id: event.id,
    version: event.version - 1,
  });
};

userSchema.pre("save", async function (done) {
  if (this.isModified("password")) {
    const hashed = await Password.toHash(this.get("password"));
    this.set("password", hashed);
  }
  done();
});

userSchema.statics.build = (attrs: UserAttrs) => {
  return new User<UserAttrs>(attrs);
};

userSchema.methods.isBanned = async function () {
  return this.is_banned;
};

const User = mongoose.model<UserDoc, UserModel>("User", userSchema);
export { User };
