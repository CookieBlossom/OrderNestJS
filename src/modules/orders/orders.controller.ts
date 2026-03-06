import { Controller, Get, UseGuards } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { CurrentUser } from 'src/common/decorators/current-user.decorator';
import type { JwtPayload } from 'src/common/interfaces/jwt-payload.interface';
import { JwtAuthGuard } from 'src/common/guards/jwt.guard';

@Controller('orders')
export class OrdersController {
  constructor(private readonly orderService: OrdersService) {}
  // Ahora al querer obtener las ordenes del actual usuario, requiere autorizacion de Bearer Token
  @UseGuards(JwtAuthGuard)
  @Get()
  getOrders(@CurrentUser() user: JwtPayload) {
    return this.orderService.getOrdersByUser(user.sub);
  }
}
