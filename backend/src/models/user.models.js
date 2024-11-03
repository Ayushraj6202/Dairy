import mongoose from 'mongoose';
import bcrypt from 'bcrypt'
const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['user', 'seller'], default: 'user' }, // Either user or seller
  accessToken: String,
  otp: { type: String, },
  otpExpires: { type: Date, },
}, { timestamps: true });
UserSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 10);
  }
  return next();
})

UserSchema.methods.isPasswordCorrect = async function (password) {
  return await bcrypt.compare(password, this.password);
}

const User = mongoose.model('User', UserSchema);
export default User;
