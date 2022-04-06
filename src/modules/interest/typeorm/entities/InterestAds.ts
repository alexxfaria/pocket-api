import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('interest')
class InterestAds {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  id_interest: string;

  @Column()
  id_ads: string;

  @Column()
  active: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
export default InterestAds;
