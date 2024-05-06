import { Router } from "express";
import { prisma } from "../db.js";

const router = Router();

router.get("/products", async (req, res) => {
    try {
        const products = await prisma.product.findMany();
        if (!products) {
            return res.status(404).json({ error: "Error when obtaining the products" })
        }
        return res.status(200).json(products);
    } catch (error) {
        return res.status(404).json({ error: "Error when obtaining the products" })
    }
});

router.post("/products", async (req, res) => {
    try {
        const newProduct = await prisma.product.create({
            data: req.body,
          });
          if (!newProduct) {
            return res.status(404).json({ error: "An error occurred while saving the product" })
          }
          return res.status(200).json(newProduct);
    } catch (error) {
        return res.status(404).json({ error: "An error occurred while saving the product" })
    }
});

router.get("/products/:id", async (req, res) => {
    try {
        const productFound = await prisma.product.findFirst({
            where: {
                id: parseInt(req.params.id)
            },
            include: {
                category: true,
            }
        })
        if (!productFound) {
            return res.status(404).json({ error: "Product not found" })
        }
        return res.status(200).json(productFound)
    } catch (error) {
        return res.status(404).json({ error: "Product not found" })
    }
})

router.delete("/products/:id", async (req, res) => {
    try {
        const productDeleted = await prisma.product.delete({
            where: {
                id: parseInt(req.params.id)
            }
        })
        if (!productDeleted) {
            return res.status(404).json({ error: "Product to remove not found" })
        }
        return res.status(200).json({ message: "Product deleted successfully" })
    } catch (error) {
        return res.status(404).json({ error: "Product to remove not found" })
    }
})

router.put("/products/:id", async (req, res) => {
    try {
        const productUpdated = await prisma.product.update({
            where: {
                id: parseInt(req.params.id)
            },
            data: req.body
        })
        if (!productUpdated) {
            return res.status(404).json({ error: "Product could not be updated" })
        }
        return res.status(200).json(productUpdated)
    } catch (error) {
        return res.status(404).json({ error: "Product could not be updated" })
    }
})

export default router;
