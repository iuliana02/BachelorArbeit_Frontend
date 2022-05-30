import { Component, OnInit } from '@angular/core';
import {StatisticsService} from "../../service/statistics.service";
import {LegendPosition} from "@swimlane/ngx-charts";

@Component({
  selector: 'app-bar-charts',
  templateUrl: './bar-charts.component.html',
  styleUrls: ['./bar-charts.component.css']
})
export class BarChartsComponent implements OnInit {

  facilityTypes: any[] = []
  facilityTypesEn: any[] = []

  view: [number, number] = [600, 400];

  // options
  legendTitle: string = 'Finishing types';
  legendPosition:  LegendPosition = LegendPosition.Below; // ['right', 'below']
  legend: boolean = true;

  xAxis: boolean = true;
  yAxis: boolean = true;

  animations: boolean = true; // animations on load

  showDataLabel: boolean = true; // numbers on bars

  gradient: boolean = true;
  colorScheme = {
    domain: ['#704FC4', '#4B852C', '#B67A3D', '#5B6FC8', '#25706F']
  };

  barPadding: number = 8
  tooltipDisabled: boolean = false;

  yScaleMax: number = 9000;

  roundEdges: boolean = true;

  constructor(public statisticsService: StatisticsService) {
    // Object.assign(this, {this.facilityTypes})
  }

  async ngOnInit() : Promise<void>{
    await this.statisticsService.getStatistics1().toPromise().then((res): any => {
      this.facilityTypes = res.data["Statistics1"]

      //translate labels to english
      this.facilityTypesEn.push({name: ' Furnished/equipped ', value: this.facilityTypes[0].value})
      this.facilityTypesEn.push({name: ' Modern/fancy ', value: this.facilityTypes[1].value})
      this.facilityTypesEn.push({name: ' Unfurnished ', value: this.facilityTypes[2].value})
      this.facilityTypesEn.push({name: ' Partially furnished/equipped ', value: this.facilityTypes[3].value})
      this.facilityTypes = this.facilityTypesEn

    })

  }

}
