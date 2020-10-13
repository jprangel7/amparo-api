import { Router } from "express";

import patientRouter from "./patient.routes";
import activityRouter from "./activity.routes";

const routes = Router();

routes.use("/patient", patientRouter);
routes.use("/activity", activityRouter);

export default routes;
