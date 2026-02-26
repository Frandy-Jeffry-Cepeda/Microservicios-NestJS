import { Module } from '@nestjs/common';
import { ProductsController } from './products.controller';
import { ClientsModule } from '@nestjs/microservices/module/clients.module';
import { Transport } from '@nestjs/microservices';
import { envs, PRODUCT_SERVICE } from 'src/config';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: PRODUCT_SERVICE, 
        transport: Transport.TCP,
        options: {
          host: envs.productsMicroserviceHost,
          port: envs.productsMicroservicePort
        }
      }
    ])
  ],
  controllers: [ProductsController],
  providers: [],
})
export class ProductsModule {}
