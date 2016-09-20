import {Component, OnInit, Input, Output, EventEmitter, OnChanges, SimpleChanges} from '@angular/core';

@Component({
  selector: 'rs-modal-window',
  templateUrl: 'modal-window.component.html',
})
export class ModalWindowComponent implements OnInit, OnChanges {
  @Input() show = false;
  @Input() title: string;
  @Input() contentText: string;
  @Input() primaryButtonText = 'Ok';
  @Input() secondaryButtonText: string;
  @Output() response = new EventEmitter<Boolean>();
  private display = 'none';
  constructor() { }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if(this.show) {
      this.display = 'block';
    } else {
      this.display = 'none';
    }
  }

  onCancel() {
    this.response.emit(false);
    this.closeModal();
  }
  private closeModal() {
    this.display = 'none';
    this.show=false;
  }

  onSubmit() {
    this.response.emit(true);
    this.closeModal()
  }
}