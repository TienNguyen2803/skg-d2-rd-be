
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { EntityHelper } from '../../utils/entity-helper';

@Entity()
export class SiteConfiguration extends EntityHelper {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  website_name: string;

  @Column({ nullable: true })
  slogan: string;

  @Column({ nullable: true })
  logo_path: string;

  @Column({ nullable: true })
  favicon_path: string;

  @Column({ nullable: true })
  email: string;

  @Column({ nullable: true })
  phone: string;

  @Column({ nullable: true })
  address: string;

  @Column({ nullable: true })
  facebook_url: string;

  @Column({ nullable: true })
  instagram_url: string;

  @Column({ nullable: true })
  copyright_text: string;

  @Column({ nullable: true })
  footer_logo_path: string;

  @Column({ default: false })
  is_active: boolean;
}
