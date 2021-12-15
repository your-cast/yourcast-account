import {Component, Input, OnInit} from '@angular/core';
import {TaxCertificate} from '../../../models/tax-certificate';

@Component({
  selector: 'app-status-row',
  templateUrl: './status-row.component.html',
  styleUrls: ['./status-row.component.sass']
})
export class StatusRowComponent implements OnInit {
  @Input() status: string = '';
  // @ts-ignore
  @Input() element: TaxCertificate;
  statuses: any;

  constructor() {
  }

  ngOnInit(): void {
    this.statuses = {
      STATUS_ACTIVE: 'Діючий (новий)',
      STATUS_ACTIVE_CLONED: 'Діючий (клон з № ***)',
      STATUS_ACTIVE_RESTORED: 'Діючий (поновлений)',
      STATUS_LOST_VALIDITY_CLONED: 'Втратив чинність (клон № ***)',
      STATUS_LOST_VALIDITY_DELETED_MANUAL: 'Втратив чинність (видалено вручну)',
      STATUS_LOST_VALIDITY_EXPIRED: 'Втратив чинність (по терміну дії)'
    };
  }

  getStatus(status: string): string {
    if (['STATUS_ACTIVE_CLONED', 'STATUS_LOST_VALIDITY_CLONED'].includes(status)) {
      console.log(this.element.detail);
      if (status === 'STATUS_ACTIVE_CLONED') {
        const activeClonedString = 'Діючий (клон з № ***)';
        return activeClonedString.replace('***', this.element.detail.CLONED_BY_ID.toString());
      }

      if (status === 'STATUS_LOST_VALIDITY_CLONED') {
        const disabledClonedString = 'Втратив чинність (клон № ***)';
        return disabledClonedString.replace('***', this.element.detail.CLONE_ID.toString());
      }
    }

    return this.statuses[status];
  }
}
