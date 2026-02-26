import { Body, Controller, Delete, Get, Inject, Param, ParseIntPipe, Patch, Post, Query } from '@nestjs/common';
import { PRODUCT_SERVICE } from 'src/config';
import { PaginationDto } from '@app/common';
import { catchError } from 'rxjs';
import { RpcException } from '@nestjs/microservices';
import { CreateProductDto, UpdateProductDto } from './dto';



@Controller('products')
export class ProductsController {
  constructor(
    @Inject(PRODUCT_SERVICE) private readonly productsClient
  ) {}

  @Post()
  createProduct(@Body() createProductDto: CreateProductDto) {
    return this.productsClient.send({ cmd: 'create_product' }, createProductDto)
  }

  @Get()
  findAllProducts(@Query() paginationDto: PaginationDto) {
    return this.productsClient.send({ cmd: 'find_all_products' }, paginationDto);
  }

  @Get(':id')
  async findOneProduct(@Param('id') id: string) {

    return this.productsClient.send({ cmd: 'find_one_product' }, { id })
    .pipe(
      catchError(err => {
        throw new RpcException(err)
      })
    );

    // try {
    //   const product = await firstValueFrom(
    //     this.productsClient.send({ cmd: 'find_one_product' }, { id })
    //   );

    //   return product;
      
    // } catch (error) {
    //   throw new RpcException(error)
    // }

  }

  @Patch(':id')
  updateProduct(
    @Body() updateProductDto: UpdateProductDto, 
    @Param('id', ParseIntPipe) id: number) 
  {
    return this.productsClient.send({ cmd: 'update_product' }, {id, ...updateProductDto })
    .pipe(
      catchError(err => {
        throw new RpcException(err)
      })
    )
  }

  @Delete(':id')
  deleteProduct(@Param('id', ParseIntPipe) id: number) {
    return this.productsClient.send({ cmd: 'delete_product' }, { id })
  }





}
