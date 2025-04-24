import { Injectable } from '@nestjs/common';
import { JwtService as NestJwtService } from '@nestjs/jwt';

@Injectable()
export class JwtService {
  constructor(private readonly jwtService: NestJwtService) {}

  sign(payload: any): string {
    return this.jwtService.sign(payload);
  }

  async verify(token: string): Promise<any> {
    return this.jwtService.verifyAsync(token);
  }

  decode(token: string): any {
    return this.jwtService.decode(token);
  }
}
