import React, { Component } from "react";
import "./App.css";
//import Map from "./Map";
import L from "leaflet";
import { Map, TileLayer, Marker, Popup, FeatureGroup } from "react-leaflet";
import { EditControl } from "react-leaflet-draw";
import {
  Button,
  Icon,
  Label,
  Grid,
  Segment,
  Input,
  Table,
  Tab,
  List,
  Image
} from "semantic-ui-react";

class App extends Component {
  constructor() {
    super();
    this.state = {
      kumpulandata: {
        type: "FeatureCollection",
        features: [
          {
            type: "Feature",
            properties: { name: "asdf", desc: "zxcv" },
            geometry: {
              type: "Polygon",
              coordinates: [
                [
                  [-122.47685194015503, 37.83325962773994],
                  [-122.47678756713866, 37.83198857304299],
                  [-122.47517824172975, 37.83202246811909],
                  [-122.47522115707397, 37.8332935222321],
                  [-122.47685194015503, 37.83325962773994]
                ]
              ]
            }
          },
          {
            type: "Feature",
            properties: {},
            geometry: {
              type: "Polygon",
              coordinates: [
                [
                  [-122.47953414916992, 37.83129372055134],
                  [-122.47927665710448, 37.830514122161276],
                  [-122.47801065444946, 37.830107371905136],
                  [-122.47775316238402, 37.83105645234809],
                  [-122.47953414916992, 37.83129372055134]
                ]
              ]
            }
          }
        ]
      },
      data: {
        type: "Feature",
        properties: {},
        geometry: {
          type: "Polygon",
          coordinates: [
            [
              [-122.48103886842728, 37.833075326166274],
              [-122.48065531253813, 37.832558431940114],
              [-122.4799284338951, 37.8322660885204],
              [-122.47963070869446, 37.83231693093747],
              [-122.47948586940764, 37.832467339549524],
              [-122.47945636510849, 37.83273426112019],
              [-122.47959315776825, 37.83289737938241],
              [-122.48004108667372, 37.833109220743104],
              [-122.48058557510376, 37.83328293020496],
              [-122.48080283403395, 37.83332529830436],
              [-122.48091548681259, 37.83322785163939],
              [-122.48103886842728, 37.833075326166274]
            ]
          ]
        }
      },
      lat: 37.832692,
      lng: -122.479942,
      zoom: 17,
      firstload: false,
      leafletGeoJSON: null,
      leafletFG: null,
      editableFGS: null,
      height: 0,
      clickedProperties: {}
    };
  }

  /*state = {
    lat: 51.505,
    lng: -0.09,
    zoom: 13
  };*/

  componentWillMount() {
    this.updateDimensions();
  }

  componentDidMount() {
    //let leafletGeoJSON = new L.GeoJSON(this.state.kumpulandata);
    //var geojsonString = this.state.data;
    //console.log("Geojsonnya: ", leafletGeoJSON._layers);
    //console.log("Geojson String: ", geojsonString);
    window.addEventListener("resize", this.updateDimensions.bind(this));
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.updateDimensions.bind(this));
  }

  updateDimensions() {
    const height = window.innerWidth >= 992 ? window.innerHeight : 400;
    this.setState({ height: height });
  }

  /* Draw Props Functions */
  _onEdited = e => {
    console.log("_onEdited: ", e);
    let numEdited = 0;
    e.layers.eachLayer(layer => {
      numEdited += 1;
    });
    console.log(`_onEdited: edited ${numEdited} layers`, e);

    this._onChange();
  };

  _onCreated = e => {
    let type = e.layerType;
    let layer = e.layer;
    /*if (type === "marker") {
      // Do marker specific actions
      console.log("_onCreated: marker created", e);
    }
    if (type === "polygon") {
      // Do marker specific actions
      console.log("_onCreated: polygon created", e);
      let coordinates = [];
      var i;
      for (i = 0; i < layer._latlngs[0].length; i++) {
        var subcoordinates = [];
        subcoordinates.push(layer._latlngs[0][i].lng);
        subcoordinates.push(layer._latlngs[0][i].lat);
        coordinates.push(subcoordinates);
      }

      // Menambahkan geojson coordinates ke feature baru:
      var newfeature = {
        type: "Feature",
        properties: {
          name: "mapid"
        },
        geometry: {
          type: "Polygon",
          coordinates: [coordinates]
        }
      };

      var currentFeature = this.state.kumpulandata;
      currentFeature.features.push(newfeature);
      this.setState({ kumpulandata: currentFeature });

      //console.log("Geojson yang baru: ", this.state.kumpulandata);
    }
    if (type === "polyline") {
      // Do marker specific actions
      console.log("_onCreated: line created", e);
    }
    // Do whatever else you need to. (save to db; etc)
    // Ini adalah kunci untuk mengedit fitur langsung di geojsonnya!!
    console.log("_onCreated: polygon createdee", e.layer._leaflet_id);
    console.log("_onCreated 2: ", this._editableFG.leafletElement._layers[e.layer._leaflet_id]);*/
    console.log("Layer help: ", e.layer);
    console.log("Geometry help: ", this._editableFG.leafletElement);
    /*this._editableFG.leafletElement._layers[e.layer._leaflet_id].feature = {
      properties: { layeridee: e.layer._leaflet_id }
    };*/
    const geojsonData = this._editableFG.leafletElement.toGeoJSON();
    console.log("Perubahan geojson: ", geojsonData);

    this._onChange();
  };

  _onDeleted = e => {
    let numDeleted = 0;
    e.layers.eachLayer(layer => {
      numDeleted += 1;
      console.log("Layer yang di delete: ", layer);
    });
    console.log(`onDeleted: removed ${numDeleted} layers`, e);

    this._onChange();
  };

  _onMounted = drawControl => {
    console.log("_onMounted", drawControl);
  };

  _onEditStart = e => {
    console.log("_onEditStart", e);
  };

  _onEditStop = e => {
    console.log("_onEditStop", e);
  };

  _onDeleteStart = e => {
    console.log("_onDeleteStart", e);
  };

  _onDeleteStop = e => {
    console.log("_onDeleteStop", e);
  };

  _editableFG = null;

  _onFeatureGroupReady = reactFGref => {
    // populate the leaflet FeatureGroup with the geoJson layers

    if (reactFGref !== null && !this.state.firstload) {
      console.log("Kumpulan Data: ", this.state.kumpulandata);
      console.log("Kumpulan reactFGref: ", reactFGref);
      let leafletGeoJSON = new L.GeoJSON(this.state.kumpulandata);
      let leafletFG = reactFGref.leafletElement;

      /*leafletGeoJSON.eachLayer(layer => {
        leafletFG.addLayer(layer);
      });*/

      // store the ref for future access to content

      this._editableFG = reactFGref;
      //this.setState({ firstload: true });
    } else {
      this._editableFG.leafletElement.clearLayers();
      console.log("Kumpulan Data 2: ", this.state.kumpulandata);
      //console.log("Kumpulan reactFGref 2: ", kumpulandata);
      let leafletGeoJSON = new L.GeoJSON(this.state.kumpulandata);
      //let leafletFG = reactFGref.leafletElement;

      leafletGeoJSON.eachLayer(layer => {
        this._editableFG.leafletElement.addLayer(layer);
      });

      // store the ref for future access to content

      this._editableFG = reactFGref;
    }

    /*if (this.state.firstload === 0) {
      // Add GEOJSON OBJECT TO MAP
      console.log("_onFeatureGroupReady: ", reactFGref);
      if (reactFGref === null) {
        return;
      }
      this._editableFG = reactFGref;
      this.setState({ editableFGS: reactFGref });
      // populate the leaflet FeatureGroup with the geoJson layers
      if (this.state.kumpulandata) {
        console.log("importing service area from state: ", this._editableFG);
        let leafletGeoJSON = new L.GeoJSON(this.state.kumpulandata);
        let leafletFG = this._editableFG.leafletElement;
        leafletGeoJSON.eachLayer(layer => leafletFG.addLayer(layer));
      } else if (this.props.kumpulandata) {
        console.log("importing service area from props");
        console.log(this.state.kumpulandata);
        let leafletGeoJSON = new L.GeoJSON(this.state.kumpulandata);
        console.log(leafletGeoJSON);
        let leafletFG = this._editableFG.leafletElement;
        console.log(leafletFG);
        leafletGeoJSON.eachLayer(layer => leafletFG.addLayer(layer));
      }
      // Ini untuk mencegah layer double load, di load waktu pertama saja
      var loadCounter = this.state.firstload;
      loadCounter = loadCounter + 1;
      this.setState({ firstload: loadCounter });
    }*/
  };

  _onChange = () => {
    // this._editableFG contains the edited geometry, which can be manipulated through the leaflet API

    const { onChange } = this.props;

    const geojsonData = this._editableFG.leafletElement.toGeoJSON();
    console.log("Perubahan geojson: ", geojsonData);
    console.log("Editable FG: ", this._editableFG.leafletElement);
    this.setState({ kumpulandata: geojsonData });
    //onChange(geojsonData);
    //this.setState({ kumpulandata: geojsonData, editableFGS: this._editableFG });

    if (!this._editableFG || !onChange) {
      return;
    }

    /*const geojsonData = this._editableFG.leafletElement.toGeoJSON();
    console.log("Perubahan geojson: ", geojsonData);
    onChange(geojsonData);*/
  };

  onEachFeature(feature, layer) {
    feature.on({
      mouseover: this.highlightFeature.bind(this),
      mouseout: this.resetHighlight.bind(this),
      click: this.clickToFeature.bind(this)
    });
  }

  clickToFeature = e => {
    //this.setState({ clickedProperties: {} });
    var layer = e.target;
    console.log("I clicked on ", e);
    //this.setState({ clickedProperties: e.layer.feature.properties });
    //console.log("I clicked on ", e.layer.feature.properties);
    //this.setState({ clickedProperties: e.layer.feature.properties });

    // Setiap feature memiliki unique leaflet id yang bisa digunakan untuk mengaksesnya
    var indexLayer = e.layer._leaflet_id;
    var indexan = 77;
    //this.state.leafletGeoJSON.eachLayer(layer => this.state.leafletFG.removeLayer(layer));
    console.log("Clicked on index: ", e.layer._leaflet_id);

    // Ini adalah kunci untuk mengedit fitur langsung di geojsonnya!!
    this._editableFG.leafletElement._layers[
      indexLayer
    ].feature.properties.name = "qwerty";
    this._editableFG.leafletElement._layers[
      indexLayer
    ].feature.properties.desc = "zxcv";
    const geojsonData = this._editableFG.leafletElement.toGeoJSON();
    console.log("Perubahan geojsonsss: ", geojsonData);
    console.log("Geojson datasss: ", this._editableFG.leafletElement);

    Object.keys(e.layer.feature.properties).map(function(key) {
      var user = e.layer.feature.properties[key];
      console.log("Keynya: ", key);
      console.log("Valuenya: ", user);
      //user.name = key;
    });

    //this._editableFG.leafletElement.removeLayer(e.layer);
  };

  render() {
    const position = [this.state.lat, this.state.lng];
    const panes = [
      {
        menuItem: "Properties",
        pane: {
          key: "tab1",
          content: (
            <Tab.Pane key="tab4">
              <Grid columns="two" divided>
                <Grid.Row>
                  <Grid.Column>Key</Grid.Column>
                  <Grid.Column>Value</Grid.Column>
                </Grid.Row>

                {Object.keys(this.state.clickedProperties).map(key => (
                  <Grid.Row>
                    <Grid.Column>
                      <Input transparent defaultValue={key} />
                    </Grid.Column>
                    <Grid.Column>
                      <Input
                        transparent
                        defaultValue={this.state.clickedProperties[key]}
                      />
                    </Grid.Column>
                  </Grid.Row>
                ))}
              </Grid>
            </Tab.Pane>
          )
        }
      },
      {
        menuItem: "Info",
        pane: {
          key: "tab2",
          content: (
            <Tab.Pane key="tab2">
              <Grid columns="two" divided>
                <Grid.Row>
                  <Grid.Column>Key</Grid.Column>
                  <Grid.Column>Value</Grid.Column>
                </Grid.Row>

                {Object.keys(this.state.clickedProperties).map(key => (
                  <Grid.Row>
                    <Grid.Column>
                      <Input transparent defaultValue={key} />
                    </Grid.Column>
                    <Grid.Column>
                      <Input
                        transparent
                        defaultValue={this.state.clickedProperties[key]}
                      />
                    </Grid.Column>
                  </Grid.Row>
                ))}
              </Grid>
            </Tab.Pane>
          )
        }
      },
      {
        menuItem: "Tab 3",
        pane: {
          key: "tab3",
          content: (
            <span>
              <Table celled padded>
                <Table.Header>
                  <Table.Row>
                    <Table.HeaderCell>Key</Table.HeaderCell>
                    <Table.HeaderCell>Value</Table.HeaderCell>
                  </Table.Row>
                </Table.Header>

                <Table.Body>
                  {Object.keys(this.state.clickedProperties).map(key => (
                    <Table.Row>
                      <Table.Cell>
                        <Input transparent defaultValue={key} />
                      </Table.Cell>
                      <Table.Cell>
                        <Input
                          transparent
                          defaultValue={this.state.clickedProperties[key]}
                        />
                      </Table.Cell>
                    </Table.Row>
                  ))}
                </Table.Body>
              </Table>
            </span>
          )
        }
      }
    ];

    return (
      <div class="map-container" style={{ height: this.state.height }}>
        <div style={{ zIndex: 999, position: "absolute", top: "180px" }}>
          <Label>
            <Icon name="mail" /> Layer Management
          </Label>
        </div>
        <Map center={position} zoom={this.state.zoom} style={{ zIndex: 1 }}>
          <TileLayer
            attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <div />
          <Marker position={position}>
            <Popup>
              <Table basic="very">
                <Table.Header>
                  <Table.Row>
                    <Table.HeaderCell>Key</Table.HeaderCell>
                    <Table.HeaderCell>Value</Table.HeaderCell>
                  </Table.Row>
                </Table.Header>

                <Table.Body>
                  <Table.Row>
                    <Table.Cell>
                      <Input transparent defaultValue="asdfdf" />
                    </Table.Cell>
                    <Table.Cell>Approved</Table.Cell>
                  </Table.Row>
                  <Table.Row>
                    <Table.Cell>Jamie</Table.Cell>
                    <Table.Cell>Approved</Table.Cell>
                  </Table.Row>
                  <Table.Row>
                    <Table.Cell>Jill</Table.Cell>
                    <Table.Cell>Denied</Table.Cell>
                  </Table.Row>
                </Table.Body>
              </Table>
            </Popup>
          </Marker>
          <FeatureGroup
            ref={reactFGref => {
              this._onFeatureGroupReady(reactFGref);
            }}
            onEachFeature={this.onEachFeature}
            onClick={this.clickToFeature}
          >
            <Popup value={this.state.clickedProperties}>
              <div>
                <Tab panes={panes} renderActiveOnly={false} />
              </div>
            </Popup>
            <EditControl
              position="topright"
              onEdited={this._onEdited}
              onCreated={this._onCreated}
              onDeleted={this._onDeleted}
              onMounted={this._onMounted}
              onEditStart={this._onEditStart}
              onEditStop={this._onEditStop}
              onDeleteStart={this._onDeleteStart}
              onDeleteStop={this._onDeleteStop}
              draw={{
                rectangle: false
              }}
            />
          </FeatureGroup>
        </Map>
      </div>
    );
  }
}

export default App;
