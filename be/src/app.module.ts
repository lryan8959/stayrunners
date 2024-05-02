import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { ConfigModule } from '@nestjs/config';
import { MongooseOmModule } from './mongoose.om/mongoose.om.module';
import { CacheRedisModule } from './cache.redis/cache.redis.module';
import { RedisModule } from './redis/redis.module';
import { CountriesModule } from './countries/countries.module';
@Module({
  imports: [
    UserModule,
    ConfigModule.forRoot({
      envFilePath: ['.env', '.env.development'],
    }), 
    MongooseOmModule, CountriesModule,
    
    // CacheRedisModule,
    // RedisModule, 
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
