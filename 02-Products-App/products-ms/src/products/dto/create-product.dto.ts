import { IsString, IsNumber, Min } from '@app/common';

export class CreateProductDto {

    @IsString()
    public name: string;

    @IsNumber({
        maxDecimalPlaces: 4,
    })
    @Min(0)
    public price: number;

}
