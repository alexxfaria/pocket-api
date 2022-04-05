import { CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

@Entity('partner_interest')
class PartnerInterest {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @CreateDateColumn()
  id_partners: string;

  @CreateDateColumn()
  id_interest: string;

  @CreateDateColumn()
  active: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
export default PartnerInterest;
