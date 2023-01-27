import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
 
@Entity()
class Post {
  @PrimaryGeneratedColumn()
  public id: Number;
 
  @Column()
  public title: string;
 
  @Column()
  public content: string;
}
 
export default Post;
