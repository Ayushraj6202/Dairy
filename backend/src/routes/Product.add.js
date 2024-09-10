import { Router } from "express";
import { upload } from "../middleware/multer.js";
import { addProduct } from "../controller/product.controller.js";
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
export default routeradd;