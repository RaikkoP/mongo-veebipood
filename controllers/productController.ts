
import {Request, Response, Router} from "express";
import Product from "../models/product";
import Category from "../models/category";

const router: Router = Router();

router.post('/product', async (req: Request, res: Response) => {

    const categoryData = new Category({
        name: req.params.categoryName
    })

    try {
        const savedCategoryData = await categoryData.save();
        const productData = new Product({
            name: req.params.name,
            price: req.params.price,
            image: req.params.image,
            active: req.params.active,
            stock: req.params.stock,
            created: new Date(),
            category: savedCategoryData._id
        })
        const savedProductData = await productData.save();
        res.json(200).json(savedProductData)
    } catch (error) {
        res.json(500).json({ message: error})
    }
})

router.get('/product', async (req: Request, res: Response) => {
    try {
        const data = await Product.find();
        res.json(data);
    } catch (error) {
        res.status(500).json({ message: error })
    }
})