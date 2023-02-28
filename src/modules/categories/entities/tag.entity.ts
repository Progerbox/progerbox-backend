import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
  ManyToMany,
} from 'typeorm';
import { Category } from './category.entity';
import { Resource } from '../../resources/entities/resource.entity';

@Entity({ name: 'Tags' })
export class Tag {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  categoryId: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToOne(() => Category, (category) => category.tags)
  @JoinColumn({ name: 'categoryId' })
  category: Category;

  @ManyToMany(() => Resource, (resource) => resource.tags)
  resources: Resource[];
}
