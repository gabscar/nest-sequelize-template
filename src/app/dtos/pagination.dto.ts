import { IPaginationInput } from '@domain/interfaces/common/pagination.interface';
import { IsOptional, MaxLength } from 'class-validator';

export class PaginationDto implements IPaginationInput {
  @IsOptional()
  @MaxLength(10)
  skip?: number;

  @IsOptional()
  @MaxLength(10)
  page?: number;
}
