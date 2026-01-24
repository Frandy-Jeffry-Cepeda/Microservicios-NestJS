import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';

import { v4 as uuidv4 } from 'uuid';

import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from './entities/product.entity';

@Injectable()
export class ProductsService {

  private products: Product[] = []
  
  
  create(createProductDto: CreateProductDto) {

    const { name, description, price } = createProductDto

     const newProduct: Product = new Product(
      uuidv4(),
      name,
      price,
      description
     )

    this.products.push(newProduct)

    return newProduct

  }

  findAll() {
    return this.products;
  }

  findOne(id: string): Product {

    const product = this.products.find( product => product.id === id)

    if (!product) {
      throw new NotFoundException(`Product with id ${id} not found`)
    }

    return product 

  }

  update(id: string, updateProductDto: UpdateProductDto) {

    const product = this.findOne(id)

    product.updateWith(updateProductDto)

    return product
  }

  remove(id: string) {

    const product = this.findOne(id)

    if (!product) {
      throw new NotFoundException(`Product with id ${id} not found`)
    }

    this.products = this.products.filter( prod => prod.id !== product.id)
    
  }
}
