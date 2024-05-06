import { ChangeDetectorRef, Component, ElementRef, EventEmitter, Input, Output, ViewChild, inject } from '@angular/core';
import { IListItems } from '../../interface/IListItems.interface';
import { NgClass } from '@angular/common';


@Component({
  selector: 'app-add',
  standalone: true,
  imports: [NgClass],
  templateUrl: './add.component.html',
  styleUrl: './add.component.scss'
})
export class InputAddItemComponent {

  #cdr = inject(ChangeDetectorRef);

  @ViewChild("inputText") public inputText!: ElementRef;

  @Input({required: true}) public inputListItems: IListItems[] = [];

  @Output() public outputAddListItem = new EventEmitter<IListItems>()
  public focusAndAddItem(value: string){
    if(value){
      this.#cdr.detectChanges();
      this.inputText.nativeElement.value = '';

      const currentDate = new Date();
      const timestamp = currentDate.getTime();
      const id = `ID ${timestamp}`;

      this.outputAddListItem.emit({
        id,
        checked: false,
        value,
        
      });

      return this.inputText.nativeElement.focus();
    }
  }

}
