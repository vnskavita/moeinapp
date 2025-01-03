import { DatePipe } from '@angular/common';
import { Injectable } from '@angular/core';
import { File } from '@awesome-cordova-plugins/file/ngx';

@Injectable({
    providedIn: 'root'
})
export class LogService {
  private promise: Promise<string>;
  debugMode = Number(localStorage.getItem('debugMode'));
    constructor(private file: File, public datepipe: DatePipe) { }
    private async readFile(path: string, filename: string): Promise<string | null> {
      this.debugMode = Number(localStorage.getItem('debugMode'));
      if(this.debugMode==1){
        try {
          // const fileContent = await this.file.readAsText(path, filename);
          // return fileContent;

          this.promise = this.file.readAsText(this.file.dataDirectory, filename);
            await this.promise.then(fileContent => {
              return fileContent;
          });
          // var previousLogDate = localStorage.getItem('previousLogDate')
          // var Today = this.datepipe.transform(new Date(), 'yyyy-MM-dd')
          // console.log(previousLogDate, Today)

          // if(previousLogDate==null || previousLogDate=='undefined'){
          //   previousLogDate = Today;
          //   localStorage.setItem('previousLogDate', Today);  
          // }
          // console.log(previousLogDate, Today)
        

          // previousLogDate = localStorage.getItem('previousLogDate')
          // if(previousLogDate==null || previousLogDate==undefined){
          //   previousLogDate = Today;
          //   localStorage.setItem('previousLogDate', Today);  
          // }
          // console.log(previousLogDate, Today)
        
          // if (Date.parse(previousLogDate) < Date.parse(Today)) {
          //   return null;
          // } else {
          //   this.promise = this.file.readAsText(this.file.dataDirectory, filename);
          //   await this.promise.then(fileContent => {
          //     return fileContent;
          //   });
          // }
        } catch (error) {
          return null;
        }
      }
    }
      
      private async writeFile(path: string, filename: string, content: string): Promise<void> {
        this.debugMode = Number(localStorage.getItem('debugMode'));
        if(this.debugMode==1){
          try {
            await this.file.writeFile(path, filename, content, {replace: true, append: true});
          } catch (error) {
          }
        }
      }

      private async createFile(path: string, filename: string): Promise<void> {
        this.debugMode = Number(localStorage.getItem('debugMode'));
        if(this.debugMode==1){
          try {
            this.file.checkDir(path, filename).then(()=>{
              console.log('Directory exists');

            }).catch(err=>{
              console.log('Directory doesnot exist');
              this.file.createFile(path, filename, true);
            })
          } catch (error) {
          }
        }
      }
      
      public async onClickDownloadPdf(key: string, value: any) {
        this.debugMode = Number(localStorage.getItem('debugMode'));
        if(this.debugMode==1){
          const logContent: string = JSON.stringify({ key, value }, null, 2);
          const path = 'file:///storage/emulated/0/Download'; // for Android
          var date = this.datepipe.transform(new Date(), 'dd-MM-yyyy')
          const filename = 'Tradesmartapp'+date+'.txt';
        
          try {
            await this.createFile(path, filename);
            // Read existing file content
            const existingContent = await this.readFile(path, filename);
            // Append new data to the existing content
            const updatedContent = existingContent ? existingContent + '\n' + logContent : logContent;
            // Write the updated content back to the file
            await this.writeFile(path, filename, updatedContent);
          } catch (error) {
          }
      }
    }
      
}