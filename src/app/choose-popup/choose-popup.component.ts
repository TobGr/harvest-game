import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
	selector: 'app-choose-popup',
	templateUrl: './choose-popup.component.html',
	styleUrls: ['./choose-popup.component.scss']
})
export class ChoosePopupComponent {
	showErrorMsg: boolean | false = false;
	errorMsg: string | null = null;

	constructor(
		@Inject(MAT_DIALOG_DATA) public data: any, 
		private matDialogRef: MatDialogRef<ChoosePopupComponent>
	) {}

	choose(seed: any) {
		if (seed.cost <= this.data.coins) {
			this.matDialogRef.close(seed);
		} else {
			this.errorMsg = "Not enough money";
			this.showErrorMsg = true;
			
			var that = this;
			setTimeout(function(){
				that.showErrorMsg = false;
			}, 2300);
		}
	}
}
