import {
  Column,
  AfterLoad,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  Index,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  BeforeInsert,
  BeforeUpdate,
  JoinColumn,
  OneToMany,
  OneToOne,
} from 'typeorm';
import { Status } from '../../statuses/entities/status.entity';
import { Department } from '../../departments/entities/department.entity';
import { Project } from '../../projects/entities/project.entity';
import { Timesheet } from '../../timesheet/entities/timesheet.entity';
import { UserRole } from '../../user-roles/entities/user-role.entity';
import bcrypt from 'bcryptjs';
import { EntityHelper } from 'src/utils/entity-helper';
import { AuthProvidersEnum } from 'src/auth/auth-providers.enum';
import { Exclude, Expose } from 'class-transformer';
import { EmployeeType } from 'src/employee-types/entities/employee-type.entity';

@Entity()
export class User extends EntityHelper {
  @PrimaryGeneratedColumn()
  id: number;

  // For "string | null" we need to use String type.
  // More info: https://github.com/typeorm/typeorm/issues/2567
  @Column({ type: String, unique: true, nullable: true })
  // @Expose({ groups: ['me', 'admin'] })
  email: string | null;

  @Column({ nullable: true })
  password: string;

  @Exclude({ toPlainOnly: true })
  public previousPassword: string;

  @AfterLoad()
  public loadPreviousPassword(): void {
    this.previousPassword = this.password;
  }

  @BeforeInsert()
  @BeforeUpdate()
  async setPassword() {
    if (this.previousPassword !== this.password && this.password) {
      const salt = await bcrypt.genSalt();
      this.password = await bcrypt.hash(this.password, salt);
    }
  }

  @Column({ default: AuthProvidersEnum.email })
  @Expose({ groups: ['me', 'admin'] })
  provider: string;

  @Index()
  @Column({ type: String, nullable: true })
  @Expose({ groups: ['me', 'admin'] })
  socialId: string | null;

  @Index()
  @Column({ type: String, nullable: true })
  firstName: string | null;

  @Index()
  @Column({ type: String, nullable: true })
  lastName: string | null;

  @Column({ type: String, nullable: true })
  short_name: string | null;

  @OneToMany(() => UserRole, (userRole) => userRole.user)
  userRoles: UserRole[];

  @ManyToOne(() => Status, {
    eager: true,
  })
  status?: Status;

  @Column({ type: String, nullable: true })
  @Index()
  @Exclude({ toPlainOnly: true })
  hash: string | null;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;

  @ManyToOne(() => Department, (department) => department.users, {
    cascade: true,
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
    eager: true
  })
  @JoinColumn({ name: 'department_id' })
  department: Department;

  @Column({ type: Number, nullable: true })
  department_id: number;

  @OneToOne(() => Department, (department) => department.manager)
  managed_department: Department;

  @OneToMany(() => Project, (project) => project.project_manager)
  managed_projects: Project[];

  @OneToMany(() => Timesheet, (timesheet) => timesheet.creator)
  timesheets: Timesheet[];

  @ManyToOne(() => EmployeeType, (employeeType) => employeeType.users, {
    cascade: true,
    onDelete: 'SET NULL',
    onUpdate: 'CASCADE',
    eager: true
  })
  @JoinColumn({ name: 'employee_type_id' })
  employee_type: EmployeeType;

  @Column({ type: Number, nullable: true })
  employee_type_id: number;
}
