import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { Tag } from '../../categories/entities/tag.entity';

@Entity({ name: 'Resources' })
export class Resource {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  url: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToMany(() => Tag, (tag) => tag.resources)
  @JoinTable({ name: 'ResourceTags' })
  tags: Tag[];
}
