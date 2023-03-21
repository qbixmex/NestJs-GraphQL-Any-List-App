import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class SeedService {

  private isProd: boolean;

  constructor(
    private readonly configService: ConfigService
  ) {
    this.isProd = configService.get('STATE') == 'prod';
  }

  async executeSeed(): Promise<boolean> {

    //* Validation
    if ( this.isProd ) {
      throw new UnauthorizedException('We cannot run SEED on Production!');
    }

    // TODO: Clear Database
    // TODO: Create Users
    // TODO: Create Items

    return true;
  }

}
