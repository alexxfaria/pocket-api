import { CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

@Entity('plans')
class Plans {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @CreateDateColumn()
  name: string;

  @CreateDateColumn()
  photos: number;

  @CreateDateColumn('decimal')
  price: number;

  @CreateDateColumn()
  time: Date;

  @CreateDateColumn()
  active: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
export default Plans;
