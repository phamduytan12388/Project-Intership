import { eventEmitterService } from 'src/app/global';
import { Injectable } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { BaseService } from './base.service';
import * as uuid from 'uuid';

export class FileUploadController {
  file: File;
  fileDataURL: string;
  progress: Promise<any>;
  uploading: Subscription;
  id: string;
  fileEventName: string;

  constructor(file: File, uploadProgress: Observable<any>) {
    this.file = file;
    this.fileDataURL = URL.createObjectURL(file);

    this.fileEventName = `file_upload_${uuid.v4()}`;

    this.progress = new Promise((resolve, reject) => {
      eventEmitterService.on(this.fileEventName, error => {
        if (error) {
          reject(error);
        } else {
          this.progress = null;
          this.uploading = null;
          resolve();
        }
      });
    });
    this.uploading = uploadProgress.subscribe(
      data => {
        this.id = data.data.id;
        eventEmitterService.emit(this.fileEventName);
      },
      error => {
        eventEmitterService.emit(this.fileEventName, error);
      }
    );
  }

  destroy() {
    if (this.uploading) {
      this.uploading.unsubscribe();
      this.uploading = null;
    }
    if (this.progress) {
      this.progress = null;
    }
    this.id = null;
  }
}

@Injectable({
  providedIn: 'root'
})
export class FileService extends BaseService {
  constructor(public http: HttpClient) {
    super(http);
  }

  getImages(fileName: string): Observable<string> {
    const url = `api/file/${fileName}`;
    return this.getImageArrayBuffer(url).pipe(
      map((data: any) => {
        // const result = btoa(String.fromCharCode(...new Uint8Array(data)));
        let binary = '';
        const bytes = new Uint8Array(data);
        const len = bytes.byteLength;
        for (let i = 0; i < len; i++) {
          binary += String.fromCharCode(bytes[i]);
        }
        return `data:image/png;base64, ${window.btoa(binary)}`;
      })
    );
  }

  uploadFile(file: File): Observable<any> {
    const url = `api/file`;
    const form = new FormData();
    form.append('file', file);
    return this.post<any>(url, form);
  }

  uploadDocumentFile(file: File): Observable<any> {
    const url = `api/file/upload`;
    const form = new FormData();
    form.append('file', file);
    return this.post<any>(url, form);
  }

  getFileImage(url): Observable<any> {
    return this.getImageArrayBuffer(`api/file/${url}`);
  }

  getFileBlod(url): Observable<any> {
    return this.getBlod(`api/file/${url}`);
  }

  // downloadFile(id: string, fileName: string) {
  //   const url = `api/file/${id}`;
  //   return this.getBlod(url).pipe(
  //     map(response => {
  //       return FileSaver.saveAs(
  //         new Blob([response], { type: response.type }), fileName
  //       );
  //     })
  //   );
  // }
}
