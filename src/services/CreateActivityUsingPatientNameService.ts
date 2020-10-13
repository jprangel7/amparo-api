import { getRepository } from "typeorm";
import { isBefore } from "date-fns";

import Activity from "../models/Activity";
import Patient from "../models/Patient";

import AppError from "../errors/AppError";

class CreateActivityUsingPatientNameService {
  public async execute(
    patient: Patient,
    expiration_date: Date,
    status: string,
    activity: string
  ): Promise<Activity> {
    const activityRepository = getRepository(Activity);

    if (!patient) throw new AppError("Patient does not exists", 400);

    if (isBefore(new Date(expiration_date), Date.now()))
      throw new AppError("This expiration date already passed", 400);

    const newActivity = activityRepository.create({
      activity,
      patient_id: patient.id,
      expiration_date,
      status,
    });

    await activityRepository.save(newActivity);

    return newActivity;
  }
}

export default CreateActivityUsingPatientNameService;
