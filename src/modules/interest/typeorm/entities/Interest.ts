import { CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

@Entity('interest')
class Interest {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @CreateDateColumn()
  name: string;

  @CreateDateColumn()
  active: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
export default Interest;
