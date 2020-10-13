import { getRepository } from "typeorm";
import { isBefore } from "date-fns";

import Activity from "../models/Activity";
import Patient from "../models/Patient";

import AppError from "../errors/AppError";

class CreateActivityService {
  public async execute(
    activity: string,
    patient_id: string,
    expiration_date: Date,
    status: string
  ): Promise<Activity> {
    const activityRepository = getRepository(Activity);
    const patientRepository = getRepository(Patient);

    const patient = await patientRepository.findOne({
      id: patient_id,
    });

    if (!patient) throw new AppError("Patient does not exists", 400);

    if (isBefore(new Date(expiration_date), Date.now()))
      throw new AppError("This expiration date already passed", 400);

    const newActivity = activityRepository.create({
      activity,
      patient_id,
      expiration_date,
      status,
    });

    await activityRepository.save(newActivity);

    return newActivity;
  }
}

export default CreateActivityService;
