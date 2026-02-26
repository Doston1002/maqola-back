import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { path } from 'app-root-path';
import { AuthModule } from 'src/auth/auth.module';
import { FileController } from './file.controller';
import { FileService } from './file.service';

@Module({
  imports: [
    AuthModule,
    ServeStaticModule.forRoot({
      rootPath: `${path}/uploads`,
      serveRoot: '/uploads',
    }),
  ],
  controllers: [FileController],
  providers: [FileService],
})
export class FileModule {}
