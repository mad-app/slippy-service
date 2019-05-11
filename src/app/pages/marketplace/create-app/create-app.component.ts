import { Component, OnInit, Output, AfterViewInit, OnDestroy, EventEmitter } from '@angular/core';
import { TranslateService } from '../../../@core/services/translate.service';

import { Dropzone } from 'dropzone';
import * as $ from 'jquery';
import * as JSZip from 'jszip';
import { saveAs } from 'file-saver';
import { AppService } from '../../../@core/services';
import { Router } from '@angular/router';

@Component({
  selector: 'slp-create-app',
  templateUrl: './create-app.component.html',
  styleUrls: ['./create-app.component.scss'],
})

export class CreateAppComponent implements OnInit {
  lang: any;
  dropzone: any;
  zip: JSZip;
  appName: string;
  appDesc: string;

  constructor(private translate: TranslateService, private api: AppService, private router: Router) {
    this.lang = translate.data.marketplace;
  }

  ngOnInit() {
    $('#dropzone').change((event) => {
      this.zip = new JSZip();
      for (let i = 0; i < event.target.files.length; i++) {
        const reader = new FileReader();
        const file = event.target.files[i];
        reader.onloadend = (e: any) => {
          const filePath = <string>file.webkitRelativePath;
          this.zip.file(filePath.substring(filePath.indexOf('/'), filePath.length), e.currentTarget.result);
        };

        reader.readAsArrayBuffer(event.target.files[i]);
      }
    });
  }

  async saveZip() {
    const fileName = this.appName + '.zip';
    this.zip.generateAsync({ type: 'base64' })
      .then((data) => {
        this.api.create({
          name: this.appName,
          desc: {
            content: this.appDesc,
          },
          creator: 'mockname', // TODO : change to actual name
          data: data,
        }).subscribe((data: any) => {
          this.router.navigateByUrl('/pages/marketplace/store');
        }, (err) => {
          console.log(err);
        });
        // saveAs(blob, fileName);
      });
  }
}
