import { Body, Controller, Get, Put, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { BasicController } from 'src/basic.controller';
import { MaturazioniBasic } from 'src/dto/Maturazioni.dto';
import { MopDett } from 'src/entities/MopDett.entity';

@Controller('mop-dett')
//@ApiTags('mop-dett')
export class MopDettController extends BasicController {
  @Put('update')
  async update(@Body() entities: MaturazioniBasic[]): Promise<any> {
    return await this.trx(async (em) => {
      for (const entity of entities) {
        console.log(entity);
        await em
          .getRepository(MopDett)
          .createQueryBuilder()
          .update(MopDett)
          .set({ dataMat: entity.dataReg })
          .where('mpSerial = :serial', {
            serial: entity.mpSerial,
          })
          .andWhere(' numRow = :row', {
            row: entity.rigaProv,
          })
          .execute();
      }
    });
  }
}
