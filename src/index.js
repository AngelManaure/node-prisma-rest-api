import express from 'express'
import productsRoutes from './routes/products.routes.js'
import categoriesRoutes from './routes/categories.routes.js'
import { PORT } from "./config.js";

const app = express()

app.use(express.json())
app.use('/api', productsRoutes)
app.use('/api', categoriesRoutes)

app.listen(PORT, () => {
    try {
        console.log(`Server running on port ${PORT}`);
    } catch (error) {
        console.log(error);
    }
})