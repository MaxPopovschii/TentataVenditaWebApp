import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Put,
  Query,
  Res,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { BasicController } from 'src/basic.controller';
import {
  AllegatiBasic,
  AllegatiPart,
  SearchAllegatiParameters,
} from 'src/dto/Allegati.dto';
import { Allegati } from 'src/entities/Allegati.entity';
import * as path from 'path';
import * as fs from 'fs';
import { Response } from 'express';
import { FileInterceptor } from '@nestjs/platform-express';
import { EntityExistsException } from 'src/exceptions/EntityNotFoundException';

@Controller('allegati')
//@ApiTags('allegati')
export class AllegatiController extends BasicController {
  @Get('/list')
  @ApiOkResponse({
    type: AllegatiBasic,
    isArray: true,
  })
  async get(@Query() param: SearchAllegatiParameters) {
    return this.trx(async (em) => {
      if (
        param.collegamentoACampo &&
        param.collegamentoATabella &&
        param.valoreCampo
      ) {
        const entities = await em.getRepository(Allegati).find({
          where: {
            collegamentoATabella: param.collegamentoATabella,
            collegamentoACampo: param.collegamentoACampo,
            valoreCampo: param.valoreCampo,
          },
        });
        return this.toDto(AllegatiBasic, entities);
      }
    });
  }
  @Get('files/:filename')
  @ApiOkResponse()
  async getFile(@Param() fileName: string, @Res() res: Response) {
    const fileDir = path.join(
      __dirname,
      '..',
      '..',
      '..',
      '..',
      'src',
      'allegati',
    );
    res.sendFile(path.join(fileDir, fileName), (err) => {
      if (err)
        res
          .status(404)
          .send({ msg: `Allegato con nome ${fileName} non esiste` });
    });
  }
  @Post('files')
  @UseInterceptors(FileInterceptor('file'))
  @ApiCreatedResponse()
  async create(
    @UploadedFile() file: Express.Multer.File,
    @Body() dto: AllegatiPart,
  ) {
    const upDir = path.join(
      __dirname,
      '..',
      '..',
      '..',
      '..',
      'src',
      'allegati',
    );
    try {
      const fileExt = path.extname(file.originalname);
      const fileName = `${Date.now()}_${file.originalname}`;
      const filePath = path.join(upDir, fileName);
      fs.writeFileSync(filePath, file.buffer);
      const info = {
        ...dto,
        estensione: fileExt?.toString().trim(),
        percorsoArchiviazione: filePath?.trim(),
        nomeFileArchiviato: fileName?.trim(),
      };
      return this.trx(async (em) => {
        const exists = await em
          .getRepository(Allegati)
          .findOne({ where: { nomeFileOriginale: dto.nomeFileOriginale } });
        if (exists) throw new EntityExistsException();

        const entity = em.getRepository(Allegati).create();
        Object.assign(entity, {
          ...info,
          dataArchiviazione: new Date(),
        });
        return em.save(entity);
      });
    } catch (error) {
      return { message: 'Impossible creating file.' };
    }
  }
  @Put(':id')
  @ApiOkResponse()
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: AllegatiPart,
  ) {
    return this.trx(async (em) => {
      const entity = await em
        .getRepository(Allegati)
        .createQueryBuilder()
        .where('id = :id', {
          id,
        })
        .getOne();
      Object.assign(entity!, body);
      await em.save(entity);
    });
  }
  @Delete('delete/:id')
  @ApiOkResponse()
  async remove(@Param('id', ParseIntPipe) id: number) {
    return this.trx(async (em) => {
      await em
        .getRepository(Allegati)
        .delete(id)
        .then((res) => {
          return JSON.stringify(res);
        })
        .catch(() => {
          throw NotFoundException;
        });
    });
  }
}
