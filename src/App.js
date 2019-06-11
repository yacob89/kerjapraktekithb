// -- Semua Import Module / Library / CSS / Custom Component & Class masuk disini setelah command npm install / yarn add
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
  Image,
  Card
} from "semantic-ui-react";
// -- End of Import Module / Library

// Deklarasi class
class App extends Component {
  // Constructor, biasanya isinya adalah statement awal dari STATE & FUNCTIONS/METHODS
  // Setiap bikin state & functions/methods harus dideklarasikan di constructor
  constructor() {
    super();
    this.state = {
      lat: 37.832692, // <-- Contoh deklarasi state
      lng: -122.479942,
      zoom: 17,
      counter: 0,
      cardColor: "red"
    };
    this.updateDimensions = this.updateDimensions.bind(this); // <-- Contoh deklarasi functions/methods
    this.increaseCounter = this.increaseCounter.bind(this);
    this.clearCounter = this.clearCounter.bind(this);
    this.changeCardColor = this.changeCardColor.bind(this);
  }

  componentWillMount() {
    // <-- Event Method bawaan react
    this.updateDimensions();
  }

  componentDidMount() {
    // <-- Event Method bawaan react
    window.addEventListener("resize", this.updateDimensions.bind(this));
  }

  componentWillUnmount() {
    // <-- Event Method bawaan react
    window.removeEventListener("resize", this.updateDimensions.bind(this));
  }

  updateDimensions() {
    // <-- Function bikinan sendiri untuk mengatur tampilan dimensi peta
    const height = window.innerWidth >= 992 ? window.innerHeight : 400;
    this.setState({ height: height });
  }

  increaseCounter(event) {
    console.log("Event click: ", event.target);
    var increment = this.state.counter;
    increment = increment + 1;
    this.setState({ counter: increment });
  }

  clearCounter(event) {
    console.log("Event click: ", event.target);
    this.setState({ counter: 0 });
  }

  changeCardColor(event) {
    console.log("Event click: ", event.target);
    this.setState({ cardColor: "blue" });
  }

  render() {
    // <-- Event method bawaan react || Fungsinya untuk render tampilan UI
    const position = [this.state.lat, this.state.lng];
    const leftPanelStyle = {
      zIndex: 999,
      position: "absolute",
      top: "180px",
      left: "10px"
    };

    // Perhatikan perbedaan tag yang pakai huruf kecil & huruf besar, misalnya <div></div> --> ini merupakan komponen HTML biasa, sedangkan tag yang pakai huruf besar, contoh <Card></Card> itu merupakan CUSTOM COMPONENT yang diimport dari Library di atas (lihat bagian import). Setiap komponen biasanya punya PROPS (Properties), bisa berupa attribut misalnya style, color, visible, etc..., atau bisa berupa method/action misalnya onClick

    // Setiap komponen yang di dalamnya diberikan STATE, jika nilai state nya berubah, maka komponen tersebut akan diupdate otomatis oleh React

    return (
      // <-- Tampilan UI semua ada di sini
      <div class="map-container" style={{ height: this.state.height }}>
        <div style={leftPanelStyle}>
          <Card color={this.state.cardColor}>
            <Card.Content header="About Amy" />
            <Card.Content description="Description" />
            <Card.Content>Counter: {this.state.counter}</Card.Content>
            <Card.Content extra>
              <Button id="merah" basic color="red" onClick={this.increaseCounter}>
                Update State
              </Button>
              <Button id="hijau" basic color="green" onClick={this.clearCounter}>
                Clear
              </Button>
              <Button id="biru" basic color="blue" onClick={this.changeCardColor}>
                Ganti Warna
              </Button>
            </Card.Content>
          </Card>
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
        </Map>
      </div>
    );
  }
}

export default App;
