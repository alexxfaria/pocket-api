import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('ads')
class Ads {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  description: string;

  @Column()
  color: string;

  @Column()
  measure: string;

  @Column('decimal')
  max_price: number;

  @Column()
  ideal_amount: number;

  @Column()
  min_amount: number;

  @Column()
  max_amount: number;

  @CreateDateColumn()
  limit_date: Date;

  @CreateDateColumn()
  validity_check: Date;

  @CreateDateColumn()
  id_partner: string;

  @CreateDateColumn()
  active: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
export default Ads;
