import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { DataService } from 'src/app/service/data.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  selectedItem: any;
  basicData: any;
  lineData: any;
  message: any;

  // config: AppConfig;
  basicOptions: any;
  subscription: Subscription | any;
  chartData: any[] = [];
  tempArr: any[] = [];
  humidArr: any[] = [];

  cityArr: string[] = ['Pune', 'Bangalore', 'Mumbai', 'Delhi', 'Chennai', 'Hyderabad'];
  years: any = [{key:'20200101',value:'2020'}, {key:'20210101', value:'2021'}, {key:'20220101', value: '2022'}, 
                {key:'20230101', value:'2023'}, {key:'20240101', value:'2024'}]

  constructor(private dataService: DataService) {
  }

  ngOnInit(): void {
    this.cityArr.forEach(async (city: string) => {
      await this.getWeatherStatus(city.toLowerCase());
    });
    this.lineData = {
      labels: this.years.map((element: any) => {
        console.log("element element", element.value);
        return element.value;
      }),
      datasets: [
          {
              label: 'Static Data',
              data: [65, 59, 80, 81, 56, 55, 40],
              fill: false,
              borderColor: '#42A5F5',
              tension: .4
          },

      ]
  };

    setTimeout(() => {
      if (this.chartData && this.chartData.length) {
        this.chartData.forEach((ele: any) => {
          this.tempArr.push(ele.temp)
        })
        this.chartData.forEach((ele: any) => {
          this.humidArr.push(ele.humidity)
        })
      }
      this.basicData = {
        labels: this.cityArr,
        datasets: [
          {
            label: 'Temprature',
            backgroundColor: '#EC407A',
            data: this.tempArr
            // data: [65, 59, 80, 81, 56, 55, 40]
          },
          {
            label: 'Humidity',
            backgroundColor: '#78909C',
            data: this.humidArr
          }
        ]
      };
    }, 1000);
    console.log("this.chartData", this.chartData);
  }

  getWeatherStatus(city: any) {
    return new Promise((resolve, reject) => {
      this.dataService.getCurrentWeatherStatus(city).subscribe((res: any) => {
        this.chartData.push({ city: res.name, temp: res.main.temp, humidity: res.main.humidity });
        resolve(true);
      })
    })

  }

  onSelectItem(event: any) {
    this.selectedItem = event;
    console.log("this.selectedItem ", this.selectedItem)
  }

}