<template>
  <div class="container">
    <div class="container-fluid">
      <a class="navbar-brand" href="#">Ramalan Cuaca Wilayah Indonesia</a>
      <form class="d-flex" role="search">
        <input class="form-control me-2" 
          type="search"
          v-model="selected_weather"
          placeholder="search by kota">
      </form>
    </div>
    <div class="row mt-4">
      <div class="col-lg-3 col-md-4 col-sm-6 container" 
        v-for="data in filteredItems" :key="data.id">
        <div class="card shadow m-2"
          @click="getId(data.id)"
          data-bs-toggle="modal" 
          :data-bs-target="'#exampleModal-' + data.id">
          <div class="card-body">
            <h5>Provinsi : {{data.propinsi}}</h5>
            <p>Kota : {{data.kota}}</p>
            <p>Kecamatan : {{data.kecamatan}}</p>
          </div>
        </div>
        <div class="modal fade" 
          :id="'exampleModal-' + data.id" 
          tabindex="-1" 
          :aria-labelledby="'exampleModalLabel-' + data.id" 
          aria-hidden="true">
          <div class="modal-dialog modal-fullscreen">
            <div class="modal-content card">
              <div class="modal-header">
                <h1 class="modal-title fs-5" 
                id="exampleModalLabel">{{data.kota}}, </h1>
                <p class="modal-title fs-5" 
                  id="exampleModalLabel"> &nbsp;Kecamatan {{data.kecamatan}}</p>
                <button type="button" 
                  class="btn-close" 
                  data-bs-dismiss="modal" 
                  aria-label="Close"></button>
              </div>
              <div class="modal-body">
                <div class="row">
                  <div
                    class="col-md-3 mb-3 d-flex justify-content-center"
                    v-for="(data, index) in data_weather_by_id"
                    :key="index">
                    <div class="m-3">
                      <div class="row">
                        <div class="align-items-center">
                          <img style="width: 100px; height: 100px;"
                            v-if="data.kodeCuaca === '0'"
                            src="https://icons.iconarchive.com/icons/oxygen-icons.org/oxygen/256/Status-weather-clear-icon.png" 
                            class="card-img-top" alt="...">
                          <img style="width: 100px; height: 100px;"
                            v-if="data.kodeCuaca === '4'"
                            src="https://icons.iconarchive.com/icons/oxygen-icons.org/oxygen/256/Status-weather-clouds-night-icon.png" 
                            class="card-img-top" alt="...">
                          <img style="width: 100px; height: 100px;"
                            v-if="data.kodeCuaca === '1'"
                            src="https://icons.iconarchive.com/icons/oxygen-icons.org/oxygen/256/Status-weather-clouds-icon.png" 
                            class="card-img-top" alt="...">
                          <img style="width: 100px; height: 100px;"
                            v-if="data.kodeCuaca === '60'"
                            src="https://icons.iconarchive.com/icons/oxygen-icons.org/oxygen/256/Status-weather-showers-day-icon.png" 
                            class="card-img-top" alt="...">
                          <img style="width: 100px; height: 100px;"
                            v-if="data.kodeCuaca === '95'"
                            src="https://icons.iconarchive.com/icons/oxygen-icons.org/oxygen/256/Status-weather-storm-night-icon.png" 
                            class="card-img-top" alt="...">
                          <img style="width: 100px; height: 100px;"
                            v-if="data.kodeCuaca === '3'"
                            src="https://icons.iconarchive.com/icons/pixelkit/flat-jewels/256/Weather-icon.png" 
                            class="card-img-top" alt="...">
                          <img style="width: 100px; height: 100px;"
                            v-if="data.kodeCuaca === '45'"
                            src="https://icons.iconarchive.com/icons/oxygen-icons.org/oxygen/256/Status-weather-many-clouds-icon.png" 
                            class="card-img-top" alt="...">
                          <div class="card-body">
                            <h5 class="card-text">
                              <small>
                                {{data.jamCuaca.substring(0, 10)}}
                              </small>
                            </h5>
                            <h3>
                              Jam : {{data.jamCuaca.substring(11, 20)}}
                            </h3>
                            <h5 class="card-title">
                              {{data.cuaca}}
                            </h5>
                            <small>{{data.tempC}}&deg; C - </small>
                            <small>{{data.tempF}}&deg; F</small>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div> 
    </div>
  </div>
</template>

<script>
  export default{
    data() {
      return {
        data_weather_by_id: [],
        selected_weather: '',
        items: [],
      }
    },
    mounted() {
      this.getWeather()
    },
    methods: {
      getWeather(){
        this.$http.get('https://ibnux.github.io/BMKG-importer/cuaca/wilayah.json')
        .then(ress => {
          this.items = ress.data
        })
      },
      detailWeather(id){
        this.$http.get(`https://ibnux.github.io/BMKG-importer/cuaca/${id}.json`)
        .then(ress => {
          this.data_weather_by_id = ress.data;
        })
      },
      getId(id){
        this.detailWeather(id)
      }
    },
    computed: {
      filteredItems() {
        return this.items.filter(item => {
          return item.kota.toLowerCase().includes(this.selected_weather.toLowerCase()) 
        });
      },
    },
  }
</script>