import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('partner_interest')
class PartnerInterest {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  id_partners: string;

  @Column()
  id_interest: string;

  @Column()
  active: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
export default PartnerInterest;
