
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Functionality } from 'src/functionalities/entities/functionality.entity';
import { Repository } from 'typeorm';

@Injectable()
export class FunctionalitySeedService {
  constructor(
    @InjectRepository(Functionality)
    private repository: Repository<Functionality>,
  ) { }

  async run() {
    const functionalities = [
      { id: 1, name: 'Timesheet', description: "Bảng chấm công" },
      { id: 2, name: 'Project', description: "Quản lý dự án" },
    ];

    for (const functionality of functionalities) {
      const exists = await this.repository.findOne({ where: { id: functionality.id } });
      if (exists) {
        await this.repository.update(functionality.id, functionality);
      } else {
        await this.repository.save(this.repository.create(functionality));
      }
    }
  }
}
