import { Injectable } from '@nestjs/common';
import { Order } from './interfaces/order.interface';
@Injectable()
export class OrdersService {
  private orders: Order[] = [];

  getOrdersByUser(userId: number): Order[] {
    return this.orders.filter((order) => order.userId === userId);
  }
}
