import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @ApiProperty({ description: '自增 id' })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ description: '标题' })
  @Column({ length: 500 })
  username: string;

  @ApiProperty({ description: '密码' })
  @Column({ length: 500 })
  password: string;

  @ApiProperty({ description: '邮箱' })
  @Column({ length: 500 })
  email: string;

  @ApiProperty({ description: '是否为管理员' })
  @Column('int')
  is_admin?: number;
}