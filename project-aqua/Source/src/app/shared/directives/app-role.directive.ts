// import {
//   Directive,
//   ElementRef,
//   OnInit,
//   Input,
//   TemplateRef,
//   ViewContainerRef
// } from '@angular/core';
// import { RoleService } from '../services/role.service';

// @Directive({
//   selector: '[appRole]'
// })
// export class RoleDirective implements OnInit {
//   @Input() permission: {
//     key: string;
//     active: string;
//     inactive: string;
//   };
//   @Input() targetObject?: any;

//   constructor(
//     private el: ElementRef,
//     private roleService: RoleService,
//     private templateRef: TemplateRef<any>,
//     private viewContainer: ViewContainerRef
//   ) {}

//   ngOnInit() {}

//   @Input()
//   set appRole(val) {
//     this.permission = val;
//     this.checkPermission();
//   }

//   private checkPermission() {
//     const exist =
//       (this.permission && this.permission.key) ||
//       this.roleService.cacheRole[this.permission.key];

//     // TODO
//     // check theo data của đối tượng hướng tới.

//     this.processElement(exist ? 'active' : 'inactive');
//     this.viewContainer.clear();
//   }

//   private processElement(type: string) {
//     switch (this.permission[type]) {
//       case 'show': {
//         this.viewContainer.createEmbeddedView(this.templateRef);
//         break;
//       }
//       case 'disabled': {
//         this.viewContainer.createEmbeddedView(this.templateRef);
//         if (this.el.nativeElement.nextElementSibling) {
//           this.el.nativeElement.nextElementSibling.disabled = true;
//         }
//         break;
//       }
//       case 'hide': {
//         this.viewContainer.clear();
//         break;
//       }
//       default: {
//         this.viewContainer.clear();
//       }
//     }
//   }
// }
