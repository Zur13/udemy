import {Directive, ElementRef, Input, OnInit, Renderer2} from "@angular/core";

@Directive({
  selector: '[appDropdown]'
})
export class DropdownDirective implements OnInit {
  @Input('appDropdown') set isShown(value: boolean) {
    if (this.renderer2 && this.elRef) {
      // console.log("New val = ", value);
      if (value === true) {
        // console.log("Adding class ");
        this.renderer2.addClass(this.elRef.nativeElement, "show");
      } else {
        // console.log("Removing class ");
        this.renderer2.removeClass(this.elRef.nativeElement, "show");
      }
    }
  };

  constructor(private renderer2: Renderer2, private elRef: ElementRef) {
  }

  ngOnInit(): void {
  }


}
