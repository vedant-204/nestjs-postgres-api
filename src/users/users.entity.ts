import { Column, Entity, OneToOne, OneToMany, JoinColumn, PrimaryGeneratedColumn } from 'typeorm';
import { Exclude } from 'class-transformer';
import Address from './address.entity';
import Posts from '../posts/posts.entity';

@Entity()
class user {
  @PrimaryGeneratedColumn()
  public id?: number;

  @Column({ unique: true })
  public email: string;

  @Column({ nullable: true })
  @Exclude()
  public currentHashedRefreshToken?: string;

  @Column()
  public name: string;

  @Column()
  @Exclude()
  public password: string;

  @OneToOne(() => Address, {
    eager: true,
    cascade: true
  })
  @JoinColumn()
  public address: Address;

  @OneToMany(() => Posts, (post: Posts) => post.author)
  public posts?: Posts[];
}

export default user;
