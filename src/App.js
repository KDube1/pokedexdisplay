import React, { useEffect, useState } from "react";
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';
import filterFactory, { textFilter } from 'react-bootstrap-table2-filter'
import {Card, Button} from 'react-bootstrap';
import usePokemonInfo from './hooks'
export default function App() {
  const [data, setData] = useState([]);
  const [pokedexEntry, getPokedexEntry] = usePokemonInfo();
  const [pokeName, setPokeName] = useState("Pokemon");
  
  useEffect(() => {

    fetchAPI();


  }, []);

  function alterJSON(json) {
    let tableArray = [];
    for (let i = 0; i < json.results.length; i++) {

      let tempObj = {
        'number': "",
        'name': ""
      }
      tempObj.number = i + 1;
      tempObj.name = json.results[i].name;
      tableArray.push(tempObj);
    }


    setData(tableArray);

  }

  async function fetchAPI(){
    await fetch("https://pokeapi.co/api/v2/pokemon?limit=1050")
      .then(response => response.json())
      .then(json => alterJSON(json));
  }

  const columns = [
    {
      dataField: 'number',
      text: "Number",
      sort: true
    },
    {
      dataField: 'name',
      text: 'Name',
      filter: textFilter(),


    }]

     const rowEvents = {
      onClick: (e, row, rowIndex) => {
       getPokedexEntry(row.number);
    }
  }


  return (

    <div>
      <BootstrapTable
        striped
        hover
        keyField='number'
        data={data}
        columns={columns}
        rowEvents = {rowEvents}
        pagination={paginationFactory()}
        filter={filterFactory()}
      />


<Card style={{ width: '18rem' }}>
  <Card.Img variant="top" src={pokedexEntry.sprite} />
  <Card.Body>
    <Card.Title>{pokedexEntry.name}</Card.Title>
    <Card.Text>
      ~~~~~~~~~~~~
    </Card.Text>
    <Button variant="primary">Go somewhere</Button>
  </Card.Body>
</Card>

    </div>
  )
}