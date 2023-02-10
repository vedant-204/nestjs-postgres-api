import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import User from '../users/users.entity';
 
@Entity()
class Post {
  @PrimaryGeneratedColumn()
  public id: number;
 
  @Column()
  public title: string;
 
  @Column()
  public content: string;

  @Column({nullable: true})
  public category?: string;

  @ManyToOne(() => User, (author: User) => author.posts)
  public author: User;
}
 
export default Post;
