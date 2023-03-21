import { Injectable } from '@nestjs/common';

@Injectable()
export class SeedService {

  // constructor() {}

  async executeSeed(): Promise<boolean> {
    // TODO: Clear Database
    // TODO: Create Users
    // TODO: Create Items
    return true;
  }

}
