import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

export enum TodoStatus {
  TODO = 0, // 待完成
  DONE = 1, // 未完成
}

@Entity()
export class Todo {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  id: number; // 自增 id

  @ApiProperty()
  @Column({ length: 500 })
  title: string; // 标题

  @ApiProperty()
  @Column('text')
  description?: string; // 具体内容

  @ApiProperty()
  @Column('int')
  status: TodoStatus; // 状态

  @ApiProperty({ required: false })
  @Column('text')
  media?: string;
}