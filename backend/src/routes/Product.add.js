import { Router } from "express";
import { upload } from "../middleware/multer.js";
import { addProduct,editProduct } from "../controller/product.controller.js";
import {verifySeller} from '../middleware/auth.js'

const routeradd = Router();
routeradd.route("/add").post(
    upload.fields([
        {
            name: "image",
            maxCount: 1
        },
    ]),
    verifySeller,
    addProduct
)
routeradd.route("/edit/:id").post(
    upload.fields([
        {
            name: "image",
            maxCount: 1
        },
    ]),
    verifySeller,
    editProduct
)
export default routeradd;