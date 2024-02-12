import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  Matches,
  MaxLength,
  MinLength,
  isNotEmpty,
} from 'class-validator';

export class AuthCredentialsDto {
  @IsString()
  @MinLength(8)
  @MaxLength(20)
  @ApiProperty({ type: String, description: 'Username' })
  username: string;

  @IsString()
  @MinLength(8)
  @MaxLength(32)
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message: 'password is to weak',
    // custom message for error validation
  })
  @ApiProperty({ type: String, description: 'Password' })
  password: string;
}
