// toast.component.ts

import {Component, OnInit, TemplateRef} from '@angular/core';
import {ToastService} from "../../app/core/services/Toast.service";

@Component({
  selector: 'app-toast',
  templateUrl: './toast.component.html',
  styleUrls: ['./toast.component.scss']
})
export class ToastComponent implements OnInit {

  constructor(public toastService: ToastService) {}

  ngOnInit(): void {
  }

  isTemplate(toast:any) { return toast.textOrTpl instanceof TemplateRef; }

  removeToast(toast:any) {
    this.toastService.remove(toast);
  }
}
