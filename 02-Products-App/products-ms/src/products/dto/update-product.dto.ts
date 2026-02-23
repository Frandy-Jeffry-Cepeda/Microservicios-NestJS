import { PartialType } from '@nestjs/mapped-types';
import { CreateProductDto } from './create-product.dto';
import { IsNumber, IsPositive } from '@app/common';

export class UpdateProductDto extends PartialType(CreateProductDto) {

    @IsNumber()
    @IsPositive()
    id: number;



}
