import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { CommentService } from './comment.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';

@ApiTags('Comments')
@Controller('api/comments')
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  @Post('create')
  @UseGuards(AuthGuard('jwt'))
  @ApiOperation({ summary: 'Yangi comment qo‘shish' })
  create(@Body() dto: CreateCommentDto) {
    return this.commentService.create(dto);
  }

  @Get()
  @ApiOperation({ summary: 'Barcha commentlarni olish' })
  findAll() {
    return this.commentService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Commentni ID orqali olish' })
  findOne(@Param('id') id: string) {
    return this.commentService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Commentni yangilash' })
  update(@Param('id') id: string, @Body() dto: UpdateCommentDto) {
    return this.commentService.update(id, dto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Commentni o‘chirish' })
  remove(@Param('id') id: string) {
    return this.commentService.remove(id);
  }
}
