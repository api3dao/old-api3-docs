<!--
  This component displays a list of all Beacons by version.
  It loads from the services repo real-time.
-->

<template>
  <div>
    <!-- Details -->
    <div id="details" v-show="showDetail === true">
      <!-- Return to Catalog -->
      <a id="catalog-return" href="#" @click="showBeaconCatalog()">
        <div style="margin-top: -5px">‹</div>
        <div id="catalog-return-text">Catalog</div>
      </a>

      <!-- name -->
      <hr />
      <h4>Name:</h4>
      <br />{{ beacons[row].name }}
      <hr />

      <!-- description -->
      <h4>Description:</h4>
      <br />
      <div id="beacon-description">
        {{ beacons[row].description }}
      </div>
      <hr />

      <!-- beaconId -->
      <h4>beaconId:</h4>
      <br />
      <div id="beacon-id">
        {{ beacons[row].beaconId }}
      </div>
      <hr />
    </div>

    <!-- Catalog -->
    <input id="searchText" v-on:keyup="find($event)" />
    <div id="catalog" v-show="showCatalog === true">
      <div
        :id="'c' + i"
        class="beacon-box"
        v-for="(item, i) in beacons"
        v-show="item.show"
        :key="'A' + i"
      >
        <a href="#" @click="showBeaconDetail(i)">{{ item.name }}</a
        ><span class="provider">{{ item.provider }}</span>
        <div class="beacon-id-line">
          <span>{{ item.description }}</span>
        </div>
      </div>

      <!--TMP -->
      <!--div
        :id="'c' + index"
        class="beacon-box"
        v-for="index in 100"
        :key="'AA' + index"
      >
        {{ index }}
        <a href="#" @click="showBeaconDetail(index)">{{ beacons[0].name }}</a
        ><span class="provider"
          >{{ beacons[0].provider }} - {{ 'c' + index }}</span
        >
        <div class="beacon-id-line">
          <span>{{ beacons[0].description }}</span>
        </div>
      </div-->
    </div>
  </div>
</template>

<script>
import { medium } from '../../blog-posts.json';

import { servicesBeacons } from '../../config.js';
import axios from 'axios';

//const axios = require('axios');

export default {
  name: 'TestBeacon',
  props: { tab: String },
  data: () => ({
    showCatalog: true,
    showDetail: false,
    row: 0, // User selected row.
    lastScrollPosition: 0, // The last know scroll position.
    medium: medium,
    mediumByDate: [],
    beacons: [
      {
        name: 'BTC to USDC',
        provider: 'Amberdata',
        description: 'Shows the current value of BTC in USDC',
        beaconId:
          'x5a2645e149678440f775c0ec18f92ac28bd7e8329b19e0e97d14e5dc0702ea59',
        templateId: 'n/a',
        content: 'amberdata shows the current value of btc in usdc btc to usdc',
        show: true, // Set to false for context search
      },
      {
        name: 'BTC to ETH',
        provider: 'Amberdata',
        description: 'Shows the current value of BTC in ETH',
        beaconId: '2222222443546547657999999999999',
        templateId: 'n/a',
        content: 'amberdata shows the current value of btc in eth',
        show: true, // Set to false for context search
      },
    ],
  }),
  async mounted() {
    /*for (const el of servicesBeacons) {
      try {
        console.log('\nLoading:', el);
        const response = await axios.get(
          'https://api.github.com/repos/api3dao/services/contents/data/beacons/deployments/' +
            el +
            '?ref=bec92-setup'
        );

        for (const el of response.data) {
          if (el.type === 'file') {
            console.log(el.path);
            const res = await axios.get(
              'https://raw.githubusercontent.com/api3dao/services/bec92-setup/' +
                el.path
            );
            console.log(1, res.data);
            //console.log(JSON.parse(res.data));
            this.beacons.push(res.data);
          }
        }
      } catch (e) {
        console.log(e);
      }
    }
    console.log('------------');
    console.log(this.beacons);
    */

    /*const response = await axios.get(
      'https://api.github.com/repos/api3dao/services/contents/data/beacons?ref=bec92-setup'
    );
    console.log(response);
    for (const el of response.data) {
      console.log(el.name, el.type);
      if (el.type === 'dir') {
        const response = await axios.get(el._links.self);
        console.log(response.data);
      }
    }*/

    /*this.arr = medium;
    this.arr.forEach((group) => {
      group.posts.forEach((post) => {
        this.mediumByDate.push(post);
      });
    });*/
    this.beacons.sort(this.sortByDate);
  },
  methods: {
    showBeaconDetail(row) {
      this.showCatalog = false;
      this.showDetail = true;
      // Get the scrollTop
      this.lastScrollPosition = window.scrollY;
      // row in the beacons array
      this.row = row;
    },
    showBeaconCatalog() {
      this.showDetail = false;
      this.showCatalog = true;
      this.$nextTick(function () {
        window.scrollBy(0, this.lastScrollPosition);
        const container = this.$el.querySelector('#c' + this.row);
        container.style.transition = '3s';
        container.style.backgroundColor = 'pink';
        setTimeout(() => {
          container.style.transition = '3s';
          container.style.backgroundColor = 'transparent';
        }, 1000);
      });
    },
    sortByDate(a, b) {
      if (a.name > b.name) {
        return -1;
      }
      if (a.name < b.name) {
        return 1;
      }
      return 0;
    },
    // https://stackoverflow.com/questions/30891963/client-side-full-text-search-on-array-of-objects/30892533
    find(event) {
      let text = this.$el.querySelector('#searchText').value.toLowerCase();
      // console.log('--->', typeof text, text, text.length);
      // If input field is empty show all items.
      /*if (text.length === 0) {
        this.beacons.forEach((item) => {
          item.show = true;
        });
        this.showCatalog = true;
        return;
      }
      // Hide catalog for a single character.
      if (text.length === 1) {
        this.showCatalog = false;
        return;
      }*/

      //this.showCatalog = true;
      const arr = text.split(' ');
      console.log('- arr', arr);

      this.beacons.forEach((item) => {
        //let flag = false;
        arr.every((str) => {
          console.log('-->', str);
          if (str.length === 0) {
            //
          } else if (item.content.indexOf(str) > -1) {
            console.log('>> true', str, str.length);
            item.show = true;
            //flag = true;
          } else {
            console.log('>> false', str, str.length);
            item.show = false;
            return;
          }
          //if (!flag) item.show = false;
        });
      });
    },
  },
};
</script>

<style>
.provider {
  float: right;
  padding-right: 10px;
  color: gray;
  font-size: x-small;
  font-weight: bold;
}
.medium-heading {
  color: gray;
  font-size: large;
  font-weight: bold;
  margin-top: 10px;
  margin-bottom: 15px;
  border-bottom: 1px solid lightgrey;
}
.beacon-box {
  padding-top: 5px;
  padding-left: 20px;
  padding-bottom: 10px;
  border: solid lightgrey 1px;
  border-radius: 0.5em;
  margin-bottom: 5px;
}
.beacon-id-line {
  padding-left: 10px;
  font-size: small;
  border-left: solid lightgrey 3px;
}
h4 {
  margin-bottom: -10px;
}
#details {
  margin: auto;
  max-width: 600px;
  height: 400px;
  border: 3px solid lightgrey;
  border-radius: 0.5em;
  padding: 0px 5px 5px 5px;
}
#catalog-return {
  text-decoration: none;
  font-size: 30pt;
  color: #50c878;
}
#catalog-return-text {
  font-weight: 600;
  font-size: 50%;
  margin-left: 23px;
  margin-top: -31px;
}
#beacon-description {
  max-width: 500px;
  overflow-wrap: break-word;
}
#beacon-id {
  max-width: 500px;
  overflow-wrap: break-word;
}
</style>
