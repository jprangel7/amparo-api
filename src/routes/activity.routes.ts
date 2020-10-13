import { Router } from "express";
import { getRepository } from "typeorm";
import { isBefore, parseISO } from "date-fns";

import Activity from "../models/Activity";

import CreateActivityService from "../services/CreateActivityService";
import CreateActivityUsingPatientNameService from "../services/CreateActivityUsingPatientNameService";
import UpdateActivityStatusService from "../services/UpdateActivityStatusService";

const activityRouter = Router();

activityRouter.get("/", async (request, response) => {
  const activityRepository = getRepository(Activity);

  const allActivities = await activityRepository.find();

  return response.status(200).json(allActivities);
});

activityRouter.post("/", async (request, response) => {
  const { activity, patient_id, expiration_date, status } = request.body;

  const createActivity = new CreateActivityService();

  const newActivity = await createActivity.execute(
    activity,
    patient_id,
    expiration_date,
    status
  );

  return response.status(201).json(newActivity);
});

activityRouter.post("/newActivity", async (request, response) => {
  const { patient, expiration_date, status, activity } = request.body;

  const createActivity = new CreateActivityUsingPatientNameService();

  await createActivity.execute(
    patient,
    expiration_date,
    status,
    activity
  );

  const responseData = {
    patient_id: {
      name: patient.name,
      cpf: patient.cpf,
    },
    expiration_date,
    status,
    activity,
  };

  return response.status(201).json(responseData);
});

activityRouter.put("/", async (request, response) => {
  const { id, status } = request.body;

  const updateActivityStatus = new UpdateActivityStatusService();

  const updatedActivity = await updateActivityStatus.execute(id, status);

  return response.status(200).json(updatedActivity);
});

export default activityRouter;
