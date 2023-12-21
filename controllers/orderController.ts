import { Request, Response, Router } from "express";
import Order from "../models/order";
import Product from "../models/product";
import category from "../models/category";

const router: Router = Router();

router.post('/order', async (req: Request, res: Response) => {
    const data = new Order({
        header: req.body.header,
        content: req.body.content
    })

    try {
        const dataToSave = await data.save();
        res.status(200).json(dataToSave)
    }
    catch (error) {
        res.status(400).json({ message: error })
    }
})

router.get('/order', async (req: Request, res: Response) => {
    try {
        const data = await Order.find();
        res.json(data)
    }
    catch (error) {
        res.status(500).json({ message: error })
    }
})

router.get('/order/:id', async (req: Request, res: Response) => {
    try {
        const data = await Order.findById(req.params.id);
        res.json(data)
    }
    catch (error) {
        res.status(500).json({ message: error })
    }
})

router.delete('/order/:id', async (req: Request, res: Response) => {
    try {
        const id = req.params.id;
        await Order.findByIdAndDelete(id);
        const data = await Order.find();
        res.send(data);
    }
    catch (error) {
        res.status(500).json({ message: error })
    }
})

router.put('/order/:id', async (req: Request, res: Response) => {
    try {
        const id = req.params.id;
        const updatedData = req.body;
        const options = { new: true };

        const result = await Order.findByIdAndUpdate(
            id, updatedData, options
        )

        res.send(result)
    }
    catch (error) {
        res.status(500).json({ message: error })
    }
})


router.post('/order/:id/product', async (req: Request, res: Response) => {
    const id = req.params.id;
    const options = { new: true };

    const categoryData = new Category({
        name: req.params.categoryName
    })
    
    try {
        const savedCategoryData = await categoryData.save();
        const data = new Product({
            name: req.params.name,
            price: req.params.price,
            image: req.params.image,
            active: req.params.active,
            stock: req.params.stock,
            created: new Date(),
            category: savedCategoryData._id
        })
        await data.save();
        const result = await Order.findByIdAndUpdate(
            { _id: id },
            { $push: { comments: data._id } },
            options
        );
        res.send(result);
    } catch (error) {
        res.status(500).json({ message: error });
    }
 });

router.get('/order/:id/comment', async (req: Request, res: Response) => {
    try {
        const id = req.params.id;

        const result = await Order.findById(id).populate("comments");

        res.send(result);
    }
    catch (error) {
        res.status(500).json({ message: error })
    }
})


export default router;
