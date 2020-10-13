import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  JoinColumn,
  OneToOne,
} from "typeorm";

import Patient from "./Patient";

@Entity("activities")
class Activity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  activity: string;

  @OneToOne(() => Patient, (patient) => patient.id, { eager: true })
  @JoinColumn({ name: "patient_id" })
  patient_id: string;

  @Column()
  expiration_date: Date;

  @Column()
  status: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default Activity;
