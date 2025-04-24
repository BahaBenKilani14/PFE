//admin.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Admin } from './entities/admin.entity';
import { CreateAdminDto } from './dto/create-admin.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AdminService {
  constructor(
    @InjectRepository(Admin)
    private adminRepository: Repository<Admin>,
  ) {}

  // Hash password
  async hashPassword(password: string): Promise<string> {
    const salt = await bcrypt.genSalt();
    return bcrypt.hash(password, salt);
  }

  async create(createAdminDto: CreateAdminDto) {
    // Hash the password
    const hashedPassword = await this.hashPassword(createAdminDto.motDePasse);
    
    const newAdmin = this.adminRepository.create({
      ...createAdminDto,
      motDePasse: hashedPassword
    });
    
    return this.adminRepository.save(newAdmin);
  }

  findAll() {
    return this.adminRepository.find();
  }

  async findOne(id: number) {
    const admin = await this.adminRepository.findOne({ where: { id } });
    if (!admin) throw new NotFoundException(`Admin with ID ${id} not found`);
    return admin;
  }

  async update(id: number, updateAdminDto: UpdateAdminDto) {
    // If password is being updated, hash it
    if (updateAdminDto.motDePasse) {
      updateAdminDto.motDePasse = await this.hashPassword(updateAdminDto.motDePasse);
    }
    
    const admin = await this.findOne(id);
    const updated = Object.assign(admin, updateAdminDto);
    return this.adminRepository.save(updated);
  }

  async remove(id: number) {
    const admin = await this.findOne(id);
    return this.adminRepository.remove(admin);
  }
}
