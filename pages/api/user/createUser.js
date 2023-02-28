import { PrismaClient } from "@prisma/client"
const prisma = new PrismaClient()

export default async function createUser(req, res) {
    const { email, pass, name } = req.body
    if (!email || !pass || !name) res.status(404).json({ msg: "data can't be empty" })
    try {
      await prisma.user.create({ data: { email: email, password: pass, name: name } })
      res.status(201).json({ msg: "User created!" })
    } catch (err) {
      res.status(500).json({ msg: err.message})
    } finally {
      async () => {
        await prisma.$disconnect()
      }
    }
}