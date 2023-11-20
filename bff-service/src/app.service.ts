import { HttpException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { HttpService } from '@nestjs/axios';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class AppService {
  constructor(
    private configService: ConfigService,
    private httpService: HttpService,
  ) {}

  async getHello(req: Request): Promise<unknown> {
    console.log('url', req.url);
    console.log('method', req.method);
    console.log('body', req.body);
    const [recipient] = req.url.split('/')[1].split('?');
    console.log('recipient', recipient);
    const recipientURL = this.configService.get(recipient.toUpperCase());
    console.log('recipientURL', recipientURL);
    if (recipientURL) {
      try {
        const res: any = await lastValueFrom(
          this.httpService[req.method.toLowerCase()](recipientURL),
        );
        console.log('resData', res.data);
        return res.data;
      } catch (error) {
        console.log('error', error);
        throw new HttpException(
          {
            status: error.response.status,
            error: 'This is a custom message',
          },
          error.response.status,
        );
      }
    }
  }
}
