import { Request, Response, Router } from 'express';
import User from '../models/user';
import ContactData from "../models/contactData";
import PersonalDocument from "../models/personalDocument";

const router: Router = Router();

router.post('/user', async (req: Request, res: Response) => {
    const contactData = new ContactData({
        email: req.body.email,
        telephone: req.body.telephone,
        aadress: req.body.aadress
    });

    const personalDocument = new PersonalDocument({
        documentType: req.body.documentType,
        documentCode: req.body.documentCode,
        documentReleaseDate: req.body.documentReleaseDate,
        documentExpireDate: req.body.documentExpireDate,
        countryOfDocumentOrigin: req.body.documentOrigin,
    });
    try {
        const savedContactData = await contactData.save();
        const savedPersonalDocument = await personalDocument.save();
        const user = new User({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            password: req.body.password,
            admin: req.body.admin,
            created: new Date(),
            personalDocument: savedPersonalDocument._id,
            contactData: savedContactData._id
        })
        const userToSave = await user.save();
        res.status(200).json(userToSave);
    } catch (error) {
        res.status(400).json({message: error});
    }
})

router.get('/user', async (req: Request, res: Response) => {
    try {
        const data = await User.find();
        res.json(data)
    } catch (error) {
        res.status(500).json({message: error})
    }
})

router.get('/user/:id', async (req: Request, res: Response) => {
    try {
        const data = await User.findById(req.params.id);
        res.json(data);
    } catch (error) {
        res.status(500).json({ message: error })
    }
})

router.delete('/user/:id', async (req: Request, res: Response) => {
    try {
        const id = req.params.id;
        await User.findByIdAndDelete(id);
        const data = User.find();
        res.send(data);
    } catch (error) {
        res.status(500).json({ message: error })
    }
})
export default router;