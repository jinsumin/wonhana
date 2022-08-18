import { IsEmail, Length } from "class-validator";
import { Entity, Column, Index, OneToMany, BeforeInsert } from "typeorm";
import bcrypt from "bcryptjs";
import Post from "./Post";
import Vote from "./Vote";
import BaseEntity from "./Entity";

@Entity("users")
export class User extends BaseEntity {
  @Index()
  @IsEmail(undefined, { message: "이메일 형식이 아닙니다." })
  @Length(1, 255, { message: "이메일 주소는 비워둘 수 없습니다." })
  @Column({ unique: true })
  email: string;

  @Index()
  @Length(3, 32, { message: "사용자 이름은 3글자 이상이어야 합니다." })
  @Column()
  username: string;

  @Length(6, 255, { message: "비밀번호는 6자리 이상이어야 합니다." })
  @Column()
  password: string;

  @OneToMany(() => Post, (post) => post.user)
  @Column()
  posts: Post[];

  @OneToMany(() => Vote, (vote) => vote.user)
  votes: Vote[];

  @BeforeInsert()
  async hashPassword() {
    this.password = await bcrypt.hash(this.password, 6);
  }
}
