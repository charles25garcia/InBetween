import { Injectable } from '@nestjs/common';
import { MailDataRequired } from '@sendgrid/helpers/classes/mail';
import * as sgMail from '@sendgrid/mail';

@Injectable()
export class SendGridService {
  private readonly apiKey: string = process.env.API_KEY;

  constructor() {
    sgMail.setApiKey(this.apiKey);
  }

  async sendMail(data: MailDataRequired) {
    return await sgMail.send(data);
  }
}
