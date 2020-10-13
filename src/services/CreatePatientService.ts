import { getRepository } from "typeorm";
import { cpf as cpfValidator } from "cpf-cnpj-validator";

import Patient from "../models/Patient";

import AppError from "../errors/AppError";

class CreatePatientService {
  public async execute(name: string, cpf: string): Promise<Patient> {
    const patientRepository = getRepository(Patient);

    const cpfAlreadyExists = await patientRepository.findOne({
      cpf: cpf,
    });

    const nameAlreadyExists = await patientRepository.findOne({
      name: name,
    });

    if (cpfAlreadyExists) throw new AppError("This CPF already exists", 400);

    if (!cpfValidator.isValid(cpf))
      throw new AppError("CPF malformatted", 400);

    if (nameAlreadyExists) throw new AppError("This name already exists", 400);

    const newPatient = patientRepository.create({ name, cpf });

    await patientRepository.save(newPatient);

    return newPatient;
  }
}

export default CreatePatientService;
