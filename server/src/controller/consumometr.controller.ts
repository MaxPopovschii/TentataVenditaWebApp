import { Body, Controller, Get, Param, Post, Query, Res } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import * as path from 'path';
import * as fs from 'fs';
import { ConsumometrBasic } from 'src/dto/Consumometr.dto';

@Controller('files')
//@ApiTags('files')
export class ConsumometrController {
  @Get('file')
  async getFile(@Query('filename') fileName: string, @Res() res: Response) {
    try {
      const dir = path.join(
        __dirname,
        '..',
        '..',
        '..',
        '..',
        'src',
        'responses',
      );
      const filePath = path.join(dir, fileName);
      const jsonData = fs.readFile(filePath, 'utf-8', (err) =>
        console.log(err),
      );
      res.status(200).send({ jsonData });
    } catch (e) {
      res.status(404).send({
        msg: 'Errore: Questa risorsa non disponibile o non esiste.',
      });
    }
  }

  @Post('upload')
  async uploadFile(@Body() body: ConsumometrBasic, @Res() res: Response) {
    //console.log(__dirname); // C:\Users\Maxim\source\repos\TentataVenditaWebApp\server\dist\server\src\controller
    const uploadDir = path.join(
      __dirname,
      '..',
      '..',
      '..',
      '..',
      'src',
      'consumometr',
    );
    //console.log(uploadDir); // C:\Users\Maxim\source\repos\TentataVenditaWebApp\server\src\consumometr
    const fileName = `${Date.now()}.json`;
    const filePath = path.join(uploadDir, fileName);
    //console.log(filePath);
    try {
      fs.writeFileSync(filePath, JSON.stringify(body, null, 2));
      res.status(201).send({
        success: true,
        message: `File ${fileName} was succesfully uploaded to ${filePath}`,
      });
    } catch (e) {
      res.status(500).send({
        success: false,
        message: `Error writing in file`,
      });
    }
  }
}
