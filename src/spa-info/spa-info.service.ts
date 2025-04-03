import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Banner } from 'src/banners/entities/banner.entity';
import { FilterBuilder } from 'src/utils/filter-builder';
import { IPaginationOptions } from 'src/utils/types/pagination-options';
import { WorkingHour } from 'src/working-hours/entities/working-hour.entity';
import { DataSource, Repository, ILike } from 'typeorm';
import { CreateSpaInfoDto } from './dto/create-spa-info.dto';
import { UpdateSpaInfoDto } from './dto/update-spa-info.dto';
import { SpaInfo } from './entities/spa-info.entity';

@Injectable()
export class SpaInfoService {
  constructor(
    @InjectRepository(SpaInfo)
    private spaInfoRepository: Repository<SpaInfo>,
    private dataSource: DataSource // Thêm DataSource vào constructor
  ) { }

  async create(createSpaInfoDto: CreateSpaInfoDto): Promise<SpaInfo> {
    const { banners, workingHours, ...spaInfoData } = createSpaInfoDto;

    // Create spa info with relations
    const spaInfo = this.spaInfoRepository.create({
      ...spaInfoData,
      banners: banners?.map(banner => ({
        image_url: banner.image_url,
        title: banner.title,
        subtitle: banner.subtitle,
        order: banner.order,
        is_active: banner.is_active,
        type: banner.type
      })),
      workingHours: workingHours?.map(wh => ({
        day_of_week: wh.day_of_week,
        opening_time: wh.opening_time,
        closing_time: wh.closing_time,
        is_closed: false
      }))
    });

    await this.spaInfoRepository.save(spaInfo);

    // Save everything in one transaction
    await this.spaInfoRepository.save(spaInfo);

    return this.spaInfoRepository.findOneOrFail({
      where: { id: spaInfo.id },
      relations: ['banners', 'workingHours']
    })
  }

  async update(id: number, updateSpaInfoDto: UpdateSpaInfoDto): Promise<SpaInfo> {
    const { banners, workingHours, ...spaInfoData } = updateSpaInfoDto;

    // Tạo queryRunner để kiểm soát transaction
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      // Tìm spa info hiện tại
      const existingSpaInfo = await queryRunner.manager.findOne(SpaInfo, {
        where: { id },
        relations: ['banners', 'workingHours']
      });

      if (!existingSpaInfo) {
        throw new NotFoundException(`SpaInfo with ID ${id} not found`);
      }

      // 1. Cập nhật thông tin cơ bản của SpaInfo trước
      Object.assign(existingSpaInfo, spaInfoData);
      await queryRunner.manager.save(existingSpaInfo);

      // 2. Xử lý banners
      if (banners) {
        // Lấy danh sách ID của banners cần giữ lại
        const bannersToKeep = banners.filter(b => b.id).map(b => b.id);

        // Xóa banners không còn trong danh sách mới
        if (existingSpaInfo.banners && existingSpaInfo.banners.length > 0) {
          const bannersToDelete = existingSpaInfo.banners.filter(
            banner => !bannersToKeep.includes(banner.id)
          );

          if (bannersToDelete.length > 0) {
            await queryRunner.manager.remove(bannersToDelete);
          }
        }

        // Cập nhật banners hiện có
        for (const bannerData of banners) {
          if (bannerData.id) {
            // Banner đã tồn tại
            const existingBanner = existingSpaInfo.banners.find(b => b.id === bannerData.id);
            if (existingBanner) {
              Object.assign(existingBanner, {
                image_url: bannerData.image_url,
                title: bannerData.title,
                subtitle: bannerData.subtitle,
                order: bannerData.order || 0,
                is_active: bannerData.is_active === undefined ? true : bannerData.is_active,
                type: bannerData.type || 0
              });
              await queryRunner.manager.save(existingBanner);
            }
          } else {
            // Banner mới
            const newBanner = new Banner();
            Object.assign(newBanner, {
              image_url: bannerData.image_url,
              title: bannerData.title,
              subtitle: bannerData.subtitle,
              order: bannerData.order || 0,
              is_active: bannerData.is_active === undefined ? true : bannerData.is_active,
              type: bannerData.type || 0,
              spa_info_id: existingSpaInfo.id  // Thiết lập spa_info_id trực tiếp
            });
            await queryRunner.manager.save(newBanner);
          }
        }
      }

      // 3. Xử lý workingHours tương tự
      if (workingHours) {
        // Lấy danh sách ID của workingHours cần giữ lại
        const hoursToKeep = workingHours.filter(wh => wh.id).map(wh => wh.id);

        // Xóa workingHours không còn trong danh sách mới
        if (existingSpaInfo.workingHours && existingSpaInfo.workingHours.length > 0) {
          const hoursToDelete = existingSpaInfo.workingHours.filter(
            hour => !hoursToKeep.includes(hour.id)
          );

          if (hoursToDelete.length > 0) {
            await queryRunner.manager.remove(hoursToDelete);
          }
        }

        // Cập nhật workingHours hiện có
        for (const hourData of workingHours) {
          if (hourData.id) {
            // WorkingHour đã tồn tại
            const existingHour = existingSpaInfo.workingHours.find(h => h.id === hourData.id);
            if (existingHour) {
              Object.assign(existingHour, {
                day_of_week: hourData.day_of_week,
                opening_time: hourData.opening_time,
                closing_time: hourData.closing_time,
              });
              await queryRunner.manager.save(existingHour);
            }
          } else {
            // WorkingHour mới
            const newHour = new WorkingHour();
            Object.assign(newHour, {
              day_of_week: hourData.day_of_week,
              opening_time: hourData.opening_time,
              closing_time: hourData.closing_time,
              spa_info_id: existingSpaInfo.id  // Thiết lập spa_info_id trực tiếp
            });
            await queryRunner.manager.save(newHour);
          }
        }
      }

      // Commit transaction nếu mọi thứ thành công
      await queryRunner.commitTransaction();

      // Trả về entity đã được cập nhật
      return this.spaInfoRepository.findOneOrFail({
        where: { id },
        relations: ['banners', 'workingHours']
      });

    } catch (error) {
      // Rollback nếu có lỗi
      await queryRunner.rollbackTransaction();
      throw error;
    } finally {
      // Giải phóng queryRunner
      await queryRunner.release();
    }
  }


  async findManyWithPagination({ page, limit, offset }: IPaginationOptions, filterQuery?: string, sort?: string) {
    const findOptions = {
      ...FilterBuilder.buildFilter(filterQuery),
      skip: offset,
      take: limit,
      relations: ['banners', 'workingHours'],
      order: {}
    };

    if (sort) {
      const [field, direction] = sort.split(',');
      if (field && direction) {
        const upperDirection = direction.toUpperCase();
        if (upperDirection === 'ASC' || upperDirection === 'DESC') {
          findOptions.order = { [field]: upperDirection };
        }
      }
    } else {
      findOptions.order = { id: 'DESC' };
    }

    console.log('Sort options:', findOptions.order);
    return this.spaInfoRepository.find(findOptions);
  }

  standardCount(filterQuery?: string): Promise<number> {
    const findOptions = FilterBuilder.buildFilter(filterQuery);
    return this.spaInfoRepository.count(findOptions);
  }

  findOne(id: number): Promise<SpaInfo> {
    return this.spaInfoRepository.findOneOrFail({
      where: { id },
      relations: ['banners', 'workingHours'],
    });
  }

  async softDelete(id: number): Promise<void> {
    await this.spaInfoRepository.softDelete(id);
  }
}