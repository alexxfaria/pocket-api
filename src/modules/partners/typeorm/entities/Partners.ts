import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('partners')
class Partners {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column()
  phone: string;

  @Column()
  admin: boolean;

  @Column()
  avatar: string;

  @Column()
  cnpj_cpf: string;

  @Column()
  address: string;

  @Column()
  number: string;

  @Column()
  complements: string;

  @Column()
  district: string;

  @Column()
  city: string;

  @Column()
  state: string;

  @Column()
  country: string;

  @Column()
  zip: string;

  @Column()
  contact: string;

  @Column()
  landline: string;

  @Column()
  id_plan: string;

  @Column()
  stop_ads: boolean;

  @Column()
  all_ads: boolean;

  @Column()
  active: boolean;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
export default Partners;
