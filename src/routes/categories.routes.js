import { Router } from "express";
import { prisma } from "../db.js";


const router = Router()

//Rutas CRUD para las categorias (administradores, no para clientes)

router.get('/categories', async (req, res) => {
    try {
        const categories = await prisma.category.findMany({
            include: {
                products: true
            }
        })
        if (!categories) {
            res.status(404).json({ error: "Error when obtaining the categories" })
        }
        return res.status(200).json(categories)
    } catch (error) {
        res.status(404).json({ error: "Error when obtaining the categories" })
    }
})

router.get('/categories/:id', async (req, res) => {
    try {
        const category = await prisma.category.findFirst({
            where: {
                id: parseInt(req.params.id)
            },
            include: {
                products: true
            }
        })
        if (!category) {
            return res.status(400).json({ error: "Category not found" })
        }
        return res.status(200).json(category)
    } catch (error) {
        return res.status(400).json({ error: "Category not found" })
    }
})

router.post('/categories', async (req, res) => {
    try {
        const categoryAdded = await prisma.category.create({
            data: req.body
        })
        if (!categoryAdded) {
            return res.status(404).json({ error: "An error occurred while saving the category" })
        }
        return res.status(200).json({ message: "category added successfully" })
    } catch (error) {
        return res.status(404).json({ error: "An error occurred while saving the category" })
    }
})

router.delete('/categories/:id', async (req, res) => {
    try {
        const categoryDeleted = await prisma.category.delete({
            where: {
                id: parseInt(req.params.id)
            }
        })
        if (!categoryDeleted) {
            return res.status(404).json({ error: "Category to remove not found" })
        }
        res.status(200).json({ message: "Category deleted successfully" })
    } catch (error) {
        return res.status(404).json({ error: "Category to remove not found" })
    }
})

router.put('/categories/:id', async (req, res) => {
    const categoryUpdated = await prisma.category.update({
        where: {
            id: parseInt(req.params.id)
        },
        data: req.body
    })
    if (!categoryUpdated) {
        return res.status(404).json({ message: "Category could not be updated" })
    }
    return res.status(200).json(categoryUpdated)
})

export default router