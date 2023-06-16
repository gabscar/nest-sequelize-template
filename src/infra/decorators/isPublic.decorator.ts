import { SetMetadata } from '@nestjs/common';
import { IS_PUBLIC_KEY_DECORATOR } from '@domain/constants/decorators.constant';

export const IsPublic = () => SetMetadata(IS_PUBLIC_KEY_DECORATOR, true);
