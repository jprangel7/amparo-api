import { Router } from "express";
import { getRepository } from "typeorm";

import Activity from "../models/Activity";
import Patient from "../models/Patient";

import CreateActivityService from "../services/CreateActivityService";
import CreateActivityUsingPatientNameService from "../services/CreateActivityUsingPatientNameService";
import UpdateActivityStatusService from "../services/UpdateActivityStatusService";

const activityRouter = Router();

activityRouter.get("/", async (request, response) => {
  const activityRepository = getRepository(Activity);

  const allActivities = await activityRepository.find();

  return response.status(200).json(allActivities);
});

activityRouter.get("/findByDate", async (request, response) => {
  const { date } = request.body;

  const activityRepository = getRepository(Activity);

  const filteredActivities = await activityRepository.find({
    where: { expiration_date: new Date(date) },
  });

  return response.status(200).json(filteredActivities);
});

activityRouter.get("/findByStatus", async (request, response) => {
  const { status } = request.body;

  const activityRepository = getRepository(Activity);

  const filteredActivities = await activityRepository.find({
    where: { status: status },
  });

  return response.status(200).json(filteredActivities);
});

activityRouter.get("/findByCPF", async (request, response) => {
  const { cpf } = request.body;

  const activityRepository = getRepository(Activity);
  const patientRepository = getRepository(Patient);

  const patient = await patientRepository.findOne({
    where: { cpf: cpf },
  });

  let filteredActivities: Activity[] = [];

  if (patient) {
    filteredActivities = await activityRepository.find({
      where: { patient_id: patient.id },
    });
  }

  return response.status(200).json(filteredActivities);
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

  await createActivity.execute(patient, expiration_date, status, activity);

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
