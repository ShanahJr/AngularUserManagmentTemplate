import { Overlay, OverlayConfig } from '@angular/cdk/overlay';
import { ComponentPortal, PortalInjector } from '@angular/cdk/portal';
import { Injectable, Injector, TemplateRef, Type } from '@angular/core';
import { MyOverlayRef } from './my-overlay-ref';
import { OverlayComponent } from './overlay/overlay.component';
import { ModalModel } from 'src/app/Models/Modal/modal-model';

@Injectable({
  providedIn: 'root',
})
export class OverlayService {
  constructor(private overlay: Overlay, private injector: Injector) {}

  open<R = any, T = any>(content: ModalModel, data: T): MyOverlayRef<R> {
    const configs = new OverlayConfig({
      hasBackdrop: false,
      panelClass: [
        'modal',
        //'fade',
        'modal-dialog',
        'modal-dialog-centered',
        'isActive',
      ],
      //backdropClass: 'modal-background',
    });

    const overlayRef = this.overlay.create(configs);

    const myOverlayRef = new MyOverlayRef<R, T>(overlayRef, content, data);

    const injector = this.createInjector(myOverlayRef, this.injector);
    overlayRef.attach(new ComponentPortal(OverlayComponent, null, injector));

    return myOverlayRef;
  }

  createInjector(ref: MyOverlayRef, inj: Injector) {
    const injectorTokens = new WeakMap([[MyOverlayRef, ref]]);
    return new PortalInjector(inj, injectorTokens);
  }
}
