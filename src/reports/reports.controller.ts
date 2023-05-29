import {
  Controller,
  Post,
  Body,
  UseGuards,
  Patch,
  Param,
  Get,
  Query,
} from '@nestjs/common';
import { CreateUserDto } from 'src/users/dtos/create-user.dtos';
import { ReportsService } from './reports.service';
import { AuthGuard } from 'src/Guards/auth.guards';
import { CreateReportDto } from './dtos/create-report.dto';
import { CurrentUser } from 'src/users/decorators/current-user.decorators';
import { User } from 'src/users/user.entity';
import { ReportDto } from './dtos/report.dtos';
import { Serialize } from 'src/interceptor/serialize-interceptor';
import { ApproveReportDto } from './dtos/approve-report.dto';
import { AdminGuard } from 'src/Guards/admin.guards';
import { getEstimateDto } from './dtos/get-estimate.dto';
@Controller('reports')
export class ReportsController {
  constructor(private reportsService: ReportsService) {}
  @Get()
  getEstimate(@Query() query: getEstimateDto) {
    return this.reportsService.createEstimate(query);
  }
  @Post()
  @UseGuards(AuthGuard)
  @Serialize(ReportDto)
  createReport(@Body() body: CreateReportDto, @CurrentUser() user: User) {
    return this.reportsService.create(body, user);
  }
  @Patch('/:id')
  @UseGuards(AdminGuard)
  approveReport(@Param('id') id: string, @Body() body: ApproveReportDto) {
    console.log(id, body);

    return this.reportsService.changeApproval(id, body.approved);
  }
  @Get('/getAllReports')
  getAllReport() {
    return this.reportsService.getAllReports();
  }
}
