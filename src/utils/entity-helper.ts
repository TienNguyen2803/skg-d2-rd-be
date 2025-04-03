import { Exclude, instanceToPlain } from 'class-transformer';
import { AfterLoad, BaseEntity, Column, CreateDateColumn, DeleteDateColumn, UpdateDateColumn } from 'typeorm';

export class EntityHelper extends BaseEntity {
  @Exclude()
  __entity?: string;

  @UpdateDateColumn({
    type: 'timestamp with time zone', // Hoặc 'datetime'
    default: () => 'CURRENT_TIMESTAMP',
    onUpdate: 'CURRENT_TIMESTAMP', // Đảm bảo cập nhật khi update
  })
  updated_at: Date;

  @CreateDateColumn({
    type: 'timestamp with time zone', // Hoặc 'datetime', tùy DB
    default: () => 'CURRENT_TIMESTAMP',
    name: 'created_at',
  })
  created_at: Date;

  @DeleteDateColumn({
    type: 'timestamp with time zone', // Hoặc 'datetime'
    nullable: true, // Quan trọng: Phải là NULLABLE
    name: 'deleted_at',
  })
  deleted_at: Date;

  @Exclude()
  @Column({ nullable: true })
  created_by: number;

  @Exclude()
  @Column({ nullable: true })
  updated_by: number;

  @AfterLoad()
  setEntityName() {
    this.__entity = this.constructor.name;
  }

  toJSON() {
    return instanceToPlain(this);
  }
}
