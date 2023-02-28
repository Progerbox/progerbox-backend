import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, OneToMany } from 'typeorm';
import { Tag } from './tag.entity';

export enum CategoryType {
  COMMON = 'common',
  TECHNOLOGY = 'technology',
}

@Entity({ name: 'Categories' })
export class Category {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({
    type: 'enum',
    enum: CategoryType,
  })
  type: CategoryType;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @OneToMany(() => Tag, (tag) => tag.category)
  tags: Tag[];
}
