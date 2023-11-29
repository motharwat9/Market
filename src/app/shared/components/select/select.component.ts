import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.scss']
})
export class SelectComponent {
  @Input()label:string=''
  @Input()options:string[]=[]
  @Output() selectedOption :EventEmitter<string>
  constructor(){
    this.selectedOption=new EventEmitter<string>();
  }

  detectChanges(event:string){
    this.selectedOption.emit(event)
  }
}
