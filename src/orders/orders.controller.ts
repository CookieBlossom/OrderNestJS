import { Controller, Get, UseGuards } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { CurrentUser } from 'src/auth/decorators/current-user.decorator';
import type { JwtPayload } from 'src/auth/interfaces/jwt-payload.interface';
import { JwtAuthGuard } from 'src/auth/jwt.guard';

@Controller('orders')
export class OrdersController {
  constructor(private readonly orderService: OrdersService) {}
  @Get()
  @UseGuards(JwtAuthGuard)
  getOrders(@CurrentUser() user: JwtPayload) {
    return this.orderService.getOrdersByUser(user.sub);
  }
}
