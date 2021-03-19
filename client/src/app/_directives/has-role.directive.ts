import { Directive, Input, OnInit, TemplateRef, ViewContainerRef } from '@angular/core';
import { take } from 'rxjs/operators';
import { User } from '../_models/user';
import { AccountService } from '../_services/account.service';

@Directive({
  selector: '[appHasRole]'
})
export class HasRoleDirective implements OnInit {
  @Input() appHasRole: string[];
  user : User;

  constructor(private viewContaineRef: ViewContainerRef, 
      private templateRef: TemplateRef<any>, 
      private accountService: AccountService) { 
        this.accountService.currentUser$.pipe(take(1)).subscribe(user => {
          this.user = user;
        })
      }
  ngOnInit(): void {
    // clear view if no roles
    if (!this.user?.roles || this.user == null) {
      this.viewContaineRef.clear();
      return;
    }

    if (this.user?.roles.some(r => this.appHasRole.includes(r))) {
      this.viewContaineRef.createEmbeddedView(this.templateRef);
    } else {
      this.viewContaineRef.clear();
    }
  }

}
