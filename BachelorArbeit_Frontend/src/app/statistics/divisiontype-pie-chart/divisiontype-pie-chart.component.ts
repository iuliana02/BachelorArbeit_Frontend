import { Component, OnInit } from '@angular/core';
import {StatisticsService} from "../../service/statistics.service";
import {LegendPosition} from "@swimlane/ngx-charts";

@Component({
  selector: 'app-divisiontype-pie-chart',
  templateUrl: './divisiontype-pie-chart.component.html',
  styleUrls: ['./divisiontype-pie-chart.component.css']
})
export class DivisiontypePieChartComponent implements OnInit {

  divisionTypes: any[] = []
  divisionTypesEn: any[] = []
  constructor(public statisticsService: StatisticsService) { }

  async ngOnInit(): Promise<void> {
    await this.statisticsService.getDivisionTypes().toPromise().then((res): any => {
      this.divisionTypes = res.data["Abteilungstyp"]

      //translate labels to english
      this.divisionTypesEn.push({name: ' partially separate rooms ', value: this.divisionTypes[0].value})
      this.divisionTypesEn.push({name: ' totally separate rooms ', value: this.divisionTypes[1].value})
      this.divisionTypes = this.divisionTypesEn
    })
  }

  view: [number, number] = [500, 300];
  legendTitle: string = 'Division types';
  legendPosition:  LegendPosition = LegendPosition.Below; // ['right', 'below']
  legend: boolean = true;
  animations: boolean = true; // animations on load

  showDataLabel: boolean = true; // numbers on bars

  gradient: boolean = true;
  colorScheme = {
    domain: ['#B67A3D', '#25706F']
  };
}
