const express = require("express")
const cors = require("cors")

const app = express()
app.use(cors())
app.use(express.json())

app.get("/", (req, res) => {
  res.json({ message: "Backend is working!" })
})

// --- Add API code here ---

// In-memory "database"
let users = [
  { id: 1, name: "Alice" },
  { id: 2, name: "Bob" }
]

// Get all users
app.get("/users", (req, res) => {
  res.json(users)
})

// Add a new user
app.post("/users", (req, res) => {
  const { name } = req.body
  if (!name) {
    return res.status(400).json({ error: "Name is required" })
  }
  const newUser = { id: users.length + 1, name }
  users.push(newUser)
  res.status(201).json(newUser)
})

// --- End API code ---

const PORT = 4000
app.listen(PORT, () => {
  console.log(`Backend server running on http://localhost:${PORT}`)
});