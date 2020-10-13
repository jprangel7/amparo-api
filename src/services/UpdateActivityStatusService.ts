import { getRepository } from "typeorm";

import Activity from "../models/Activity";

import AppError from "../errors/AppError";

class UpdateActivityStatusService {
  public async execute(id: string, status: string): Promise<Activity> {
    const activityRepository = getRepository(Activity);

    let updatedActivity = await activityRepository.findOne({
      id: id,
    });

    if (!updatedActivity) throw new AppError("Activity not found", 404);

    updatedActivity.status = status;

    await activityRepository.save(updatedActivity);

    return updatedActivity;
  }
}

export default UpdateActivityStatusService;
