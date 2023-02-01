import { Component } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { ChoosePopupComponent } from "./choose-popup/choose-popup.component";

@Component({
	selector: "app-root",
	templateUrl: "./app.component.html",
	styleUrls: ["./app.component.scss"]
})
export class AppComponent { 
	fields: Field[] = [];
	seeds: Seed[] = [];
	coins: Coins;

	constructor(public dialog: MatDialog) {
		for (let i = 0; i < 9; i++) {
			this.fields.push(new Field(i));
		}

		this.seeds.push(
			new Seed(0, 11, 20, 9, "./assets/images/wheat-icon.png", "./assets/images/wheat.png"),
			new Seed(1, 18, 30, 13, "./assets/images/corn-icon.png", "./assets/images/corn.png"),
			new Seed(2, 25, 45, 17, "./assets/images/sunflower-icon.png", "./assets/images/sunflower.png")
		);

		this.coins = new Coins(100);
	}

	openDialog(field: Field) {
		if (field.harvestable) {
			let newCoinAmount = this.coins.value + this.seeds[field.activeSeed].profit;
			this.coins.updateCoins(newCoinAmount);

			field.harvest();
		} else {
			if (!field.growing) {
				let dialogRef = this.dialog.open(ChoosePopupComponent, {
					data: { 
						seeds: this.seeds, 
						coins: this.coins.value
					}
				});
				
				dialogRef.afterClosed().subscribe(
					result => {
						if (result != undefined && !field.growing && result.id != field.activeSeed) {
							this.grow(field, result);
						}
					}
				);
			}
		}
	}

	grow(field: Field, seed: Seed) {
		field.updateActiveSeed(seed.id);
	
		let subtractCost = this.coins.value - seed.cost;
		this.coins.updateCoins(subtractCost);

		field.currentTime = seed.growthTime;

		let growingInterval = setInterval(function () {
			if (!field.growing) {
				clearInterval(growingInterval);
			} else {
				if (field.currentTime >= 1 && !field.harvestable) {
					field.currentTime -= 1;
				} else {
					field.harvestable = true;
					field.currentTime += 1;

					if (field.currentTime >= field.overtime) {
						clearInterval(growingInterval);
						field.harvest();
					}
				}
			}
		}, 1000);
	}

	reset() {
		this.coins.updateCoins(100);

		this.fields.forEach(element => {
			element.harvest();
		});
	}
}


class Field {
	crop: string | "" = "";
	harvestable: boolean | false = false;
	growing: boolean | false = false;
	activeSeed: number | -1 = -1;
	currentTime: number;
	overtime: number;

	constructor(
		readonly id: number, 
		harvestable: boolean | false = false, 
		growing: boolean | false = false, 
		activeSeed: number | -1 = -1) {
			this.crop = "";
			this.harvestable = harvestable;
			this.growing = growing;
			this.activeSeed = activeSeed;
			this.currentTime = 0;
			this.overtime = 4;
	}

	updateActiveSeed(newSeed: number) {
		this.activeSeed = newSeed;
		this.growing = true;

		switch (newSeed) {
			case 0:
				this.crop = "active-wheat";
				break;

			case 1:
				this.crop = "active-corn";
				break;

			case 2:
				this.crop = "active-sunflower";
				break;

			default:
				this.crop = "";
				break;
		}
	}

	harvest() {
		this.crop = "";
		this.harvestable = false;
		this.growing = false;
		this.activeSeed = -1;
		this.currentTime = 0;
	}
}


class Seed {
	constructor(
		readonly id: number,
		readonly cost: number,
		readonly profit: number,
		readonly growthTime: number,
		readonly iconPath: string,
		readonly imgPath: string
	) {}
}


class Coins {
	value: number;

	constructor(value: number) {
		this.value = value;
	}

	updateCoins(newValue: number) {
		this.value = newValue;
	}
}