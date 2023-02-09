import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { Expose } from 'class-transformer';
 
@Entity()
class user {
  @PrimaryGeneratedColumn()
  public id?: number;
 
  @Column({ unique: true })
  @Expose()
  public email: string;
 
  @Column()
  @Expose()
  public name: string;

  @Column()
  public password: string;
}
 
export default user;
