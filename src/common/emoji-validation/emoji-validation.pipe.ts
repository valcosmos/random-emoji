import { BadRequestException, Injectable, PipeTransform } from '@nestjs/common';

@Injectable()
export class EmojiValidationPipe implements PipeTransform {
  transform(val?: number | string) {
    if (!val) return;

    const value = Number(val);
    if (isNaN(value)) {
      console.log('Pipe: value is NaN');
      throw new BadRequestException(
        `Validation failed: ${value} is not a number`,
      );
    }

    if (value < 0 || value > 10) {
      throw new BadRequestException(
        `Validation failed: ${value} is out of range`,
      );
    }
    console.log(`Pipe: validation passed: ${value}`);
    return value;
  }
}
