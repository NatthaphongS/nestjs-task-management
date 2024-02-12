import { EntityRepository, Repository } from 'typeorm';
import { User } from './user.entity';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import {
  ConflictException,
  InternalServerErrorException,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';

@EntityRepository(User)
export class UsersRepository extends Repository<User> {
  async createUser(authCredentialsDto: AuthCredentialsDto): Promise<void> {
    const { username, password } = authCredentialsDto;

    //hash
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);
    // console.log('salt', salt);
    // console.log('hashPassword', hashedPassword);

    const user = this.create({ username, password: hashedPassword });

    try {
      await this.save(user);
    } catch (error) {
      // console.log(error.code); // 23505 for duplicate error of user
      if (error.code === '23505') {
        throw new ConflictException('Username already exists');
        // conflict == ขัดแย้ง
      } else {
        throw new InternalServerErrorException();
      }
    }
  }
}
