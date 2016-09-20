import {Component, Input} from "@angular/core";

@Component({
  selector: 'rs-spinner',
  templateUrl: 'spinner.component.html',
  styleUrls: ['spinner.component.css']
})
export class SpinnerComponent {
  @Input() visible = true;
}