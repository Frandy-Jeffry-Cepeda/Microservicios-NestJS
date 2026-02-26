import { Injectable, NotFoundException, BadRequestException, HttpStatus } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto'
import { UpdateProductDto } from './dto/update-product.dto';
import { PrismaService } from 'src/prisma.service';
import { PaginationDto } from '@app/common';
import { RpcException } from '@nestjs/microservices';

@Injectable()
export class ProductsService {

  constructor(private prisma: PrismaService) {}

  async create(createProductDto: CreateProductDto) {

    const product = await this.prisma.product.create({
      data: createProductDto,
    })

    return product;
  }

  async findAll(paginationDto: PaginationDto) {

    const { page, limit } = paginationDto;

    const totalPage = await this.prisma.product.count();
    const lastPage = Math.ceil(totalPage / limit!);

    return {
      data: await this.prisma.product.findMany({
      where: { available : true },
      skip: (page! - 1) * limit!,
      take: limit
    }),
    meta: {
      total: totalPage,
      page,
      limit,
      lastPage
      }
    }
  
  }

  async findOne(id: number) {
    
    const product = await this.prisma.product.findUnique({
      where: {
        id,
        available: true
      }
    });

    if(!product) {
      throw new RpcException({
        message: `Product width the ${id} not found`,
        status: HttpStatus.BAD_REQUEST
      });
    }

    return product;


  }

  async update(id: number, updateProductDto: UpdateProductDto) {

    const { id: _, ...data} = updateProductDto;

    await this.findOne(id);

    return this.prisma.product.update({
      where: { id },
      data: data
    })
    
  }

  async remove(id: number) {

    await this.findOne(id);

    const product = await this.prisma.product.update({
      where: { id },
      data: {
        available: false
      }
    })

    return product;


    
  }
}
