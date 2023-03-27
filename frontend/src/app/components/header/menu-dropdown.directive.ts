import {
  Directive,
  ElementRef,
  HostBinding,
  HostListener,
} from '@angular/core';

@Directive({ selector: '[app-menu-dropdown]' })
export class MenuDropdownDirective {
  constructor(private elementRef: ElementRef) {}

  @HostBinding('class.open') isOpen: boolean = false;

  @HostListener('document:click', ['$event']) toggleOpen(event: Event) {
    this.isOpen = this.elementRef.nativeElement.contains(event.target)
      ? !this.isOpen
      : false;
  }
}
