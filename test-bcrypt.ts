import bcrypt from "bcryptjs";
async function test() {
  const hash = await bcrypt.hash("test", 10);
  const match = await bcrypt.compare("test", hash);
  console.log("Bcrypt works:", match);
}
test().catch(console.error);
