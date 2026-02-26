import { Controller, Get, HttpCode } from '@nestjs/common';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { AdminService } from './admin.service';

@Controller('admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Get('dashboard')
  @HttpCode(200)
  @Auth('ADMIN')
  async getDashboard() {
    return this.adminService.getDashboard();
  }
}
