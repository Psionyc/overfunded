import { Injectable } from '@nestjs/common';
import * as fs from 'fs'

@Injectable()
export class FilemanagerService {
  

  createNewMetadataEntity(imgUrl: string){
    const metadata = {
      "description": "The Official NFT of the Overfunded Ecosystem", 
      "external_url": "https://github.com/Psionyc/overfunded/", 
      "image": `${imgUrl}`, 
      "name": "OverfundedNFT",
      "attributes": []
    };

    const file = `${Date.now()}-${Math.round(Math.random() * 1e6)}.json`

    fs.createWriteStream(`./uploads/` + file).write(JSON.stringify(metadata))
    
    return file
  }
}
