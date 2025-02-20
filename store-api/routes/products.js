
import express from 'express';

const route = express.Router();

import { 
    getAllProductsStatic, 
    getAllProducts 
} from '../controllers/products.js';


route.route('/').get(getAllProducts);
route.route('/static').get(getAllProductsStatic);

export default route;
