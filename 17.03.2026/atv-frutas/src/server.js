import express from "express"


const app = express()
const port = 3000

let frutas = [
    {id: 1, nome: "Banana"},
    {id: 2, nome: "Maçã"},
    {id: 3, nome: "Laranja"}

]
app.get("/", (req, res) => {
    res.send("frutas achadas")
})

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})

