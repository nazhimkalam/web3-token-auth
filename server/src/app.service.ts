import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }

  async testPost(body: any): Promise<any> {
    try {
      return body;
    } catch (error) {
      throw error;
    }
  }
}
