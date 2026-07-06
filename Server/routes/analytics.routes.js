import { Router } from "express";

import { getAnalytics } from "../controllers/analytics.controller.js";

const analyticsrouter = Router();

analyticsrouter.get("/",getAnalytics);

export default analyticsrouter;