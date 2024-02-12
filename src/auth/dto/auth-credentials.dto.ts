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
  @MinLength(5)
  @MaxLength(20)
  @ApiProperty({ type: String, description: 'Contain 5-20 character' })
  username: string;

  @IsString()
  @MinLength(8)
  @MaxLength(32)
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message: 'password is to weak',
    // custom message for error validation
  })
  @ApiProperty({
    type: String,
    description:
      'Contain 8-32 character with at least 1 upper case letter,1 lower case letter,1 number or special character',
  })
  password: string;
}
