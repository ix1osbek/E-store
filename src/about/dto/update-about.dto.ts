import { PartialType } from '@nestjs/swagger';
import { CreateAboutDto } from './create-about.dto';

export class UpdateAboutDto extends PartialType(CreateAboutDto) {}
