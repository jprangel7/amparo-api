import { Router } from "express";
import { getRepository } from "typeorm";

import Patient from "../models/Patient";

import CreatePatientService from "../services/CreatePatientService";

const patientRouter = Router();

patientRouter.get("/", async (request, response) => {
  const patientRepository = getRepository(Patient);

  const allPatients = await patientRepository.find();

  return response.status(200).json(allPatients);
});

patientRouter.post("/", async (request, response) => {
  const { name, cpf } = request.body;

  const createPatient = new CreatePatientService();

  const newPatient = await createPatient.execute(name, cpf);

  return response.status(201).json(newPatient);
});

export default patientRouter;
