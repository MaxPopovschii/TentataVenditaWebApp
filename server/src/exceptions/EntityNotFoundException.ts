import { BadRequestException, NotFoundException } from '@nestjs/common';

export class EntityNotFoundException extends NotFoundException {
  constructor() {
    super('Entity could not be found');
  }
}

export class EntityExistsException extends BadRequestException {
  constructor() {
    super('Identificativo duplicato');
  }
}
