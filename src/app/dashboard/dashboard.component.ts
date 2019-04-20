import { Component, OnInit } from '@angular/core';
import { SpotLightService } from '../spot-light.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  public campaignData: any;
  public displayCampaignData: any = [];
  public today = new Date();
  public currentPage = 1;
  public activeTab = 'past';
  public pageSize = 5;
  public date: Date;

  constructor(private spotLightService: SpotLightService) {

  }

  ngOnInit() {
    this.getCampaignData();
  }

  getCampaignData() {
    this.spotLightService.getCampaignData().subscribe(data => {
      this.campaignData = data;
      this.displayCampaignData = data;
      this.filterCampaignData(this.activeTab);
    });
  }

  filterCampaignData(event) {
    this.displayCampaignData = [];
    var today = new Date();
    this.activeTab = event;

    if (event == 'past') {
      for (let data of this.campaignData) {
        var eventDate = new Date(data.campaignDate);

        if (Math.floor(eventDate.getTime() / 86400000) < Math.floor(today.getTime() / 86400000)) {
          this.displayCampaignData.push(data);
        }
      }
    } else if (event == 'live') {
      for (let data of this.campaignData) {
        var eventDate = new Date(data.campaignDate);

        if (Math.floor(eventDate.getTime() / 86400000) == Math.floor(today.getTime() / 86400000)) {
          this.displayCampaignData.push(data);
        }
      }

    } else if (event == 'upcoming') {
      for (let data of this.campaignData) {
        var eventDate = new Date(data.campaignDate);

        if (Math.floor(eventDate.getTime() / 86400000) > Math.floor(today.getTime() / 86400000)) {
          this.displayCampaignData.push(data);
        }
      }
    }
  }

  getDateDifference(date) {
    const eventDate = new Date(date);
    const diffTime = Math.abs(eventDate.getTime() - this.today.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (Math.floor(eventDate.getTime() / 86400000) < Math.floor(this.today.getTime() / 86400000)) {
      return diffDays + ' days ago';
    } else if (Math.floor(eventDate.getTime() / 86400000) > Math.floor(this.today.getTime() / 86400000)) {
      return diffDays + ' days to go';
    } else {
      return 'on';
    }
  }

  loadPage(event) {
    this.currentPage = event;
  }

  onChangeDate(index, event) {
    let date = event.year + '-' + event.month + '-' + event.day;
    this.campaignData[index].campaignDate = new Date(date);
    this.filterCampaignData(this.activeTab);
  }
}
