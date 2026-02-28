import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { path } from 'app-root-path';
import * as pathModule from 'path';
import { AuthModule } from 'src/auth/auth.module';
import { FileController } from './file.controller';
import { FileService } from './file.service';

function getUploadRoot(): string {
  const envDir = process.env.UPLOAD_DIR?.trim();
  if (envDir) return pathModule.resolve(envDir);
  return pathModule.join(path, 'uploads');
}

@Module({
  imports: [
    AuthModule,
    ServeStaticModule.forRoot({
      rootPath: getUploadRoot(),
      serveRoot: '/uploads',
    }),
  ],
  controllers: [FileController],
  providers: [FileService],
})
export class FileModule {}
