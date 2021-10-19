import { Module } from '@nestjs/common';
import { PostService } from './post.service';
import { PostController } from './post.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostRepository } from './post.repository';
import { PinRepository } from './pin.repository';
import { UserModule } from 'src/user/user.module';
import { PlaceModule } from 'src/place/place.module';
import { SavedPostRepository } from './savedPost.repository';
import { RegionModule } from 'src/region/region.module';
import { LoggerModule } from 'src/logger/logger.module';

@Module({
  imports: [TypeOrmModule.forFeature([PostRepository, PinRepository, SavedPostRepository]), UserModule, PlaceModule, RegionModule, LoggerModule],
  providers: [PostService],
  controllers: [PostController]
})
export class PostModule {}
