import { Controller, Get, Post, Request } from '@nestjs/common';
import { AppService } from './app.service';
import { verify } from "web3-token"

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Post()
  async testPost(@Request() req) {
    try {
      // getting token from authorization header
      const token = req.headers.authorization.split(' ')[1];
      console.log("Token from the server: ", token);

      const { address, body } = verify(token); // This will throw an error if the verfication fails
      console.log('address: ', address);
      console.log('body: ', body);


      const result = await this.appService.testPost(req.body);
      return result;

    } catch (error) {
      console.log(error);
    }
  }
}
