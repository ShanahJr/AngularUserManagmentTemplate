import { Component, OnInit, TemplateRef, Type } from '@angular/core';
import { MyOverlayRef } from '../my-overlay-ref';
import { ModalModel } from 'src/app/Models/Modal/modal-model';

@Component({
  selector: 'app-overlay',
  templateUrl: './overlay.component.html',
  styleUrls: ['./overlay.component.scss'],
})
export class OverlayComponent implements OnInit {
  modalData: ModalModel;
  contentType: 'template' | 'string' | 'component' | 'modal';

  constructor(private ref: MyOverlayRef) {}

  ngOnInit(): void {
    this.modalData = this.ref.content;

    if (typeof this.modalData === 'string') {
      this.contentType = 'string';
    } else if (this.modalData instanceof TemplateRef) {
      this.contentType = 'template';
      // this.modalData = {
      //   close: this.ref.close.bind(this.ref)
      // };
    } else {
      this.contentType = 'modal';
    }
  }

  close() {
    this.ref.close(null);
  }
}
