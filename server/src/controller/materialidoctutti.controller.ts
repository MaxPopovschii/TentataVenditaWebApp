import { Controller, Get, Query } from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { BasicController } from 'src/basic.controller';
import { MaterialiDocTuttiFilters as Filters } from 'src/dto/MaterialiDocTutti.dto';
import { MaterialiDocTutti as Entity } from 'src/entities/MaterialiDocTuttti.entity';
import { MaterialiDocTuttiView as EntityView } from 'src/dto/MaterialiDocTutti.dto';

@Controller('materiali-doc-tutti')
//@ApiTags('materiali-doc-tutti')
export class MaterialiDocTuttiController extends BasicController {
  @Get('/view')
  @ApiOkResponse()
  async list(@Query() param: Filters) {
    return this.trx(async (em) => {
      const q = em.getRepository(Entity).createQueryBuilder('d');
      const entities = q
        .where('d.MTCODMAT = :cod', {
          cod: param.MTCODMAT,
        })
        .getMany();
      return this.toDto(EntityView, entities);
    });
  }
}
