import {Fragment, useEffect, useState} from "react";
import Header from "./componentes/Header";
import Formulario from "./componentes/Formulario";
import Clima from "./componentes/Clima";
import Error from "./componentes/Error";

function App() {

    const key = "6ea22c144f7102531ab565d998729758"

    const [busqueda, setBusqueda] = useState({
        ciudad:'',
        pais:''
    })

    const [consulta, setCosulta] = useState(false);
    const [resultado, setResultado] = useState({});
    const [error, setError] = useState(false)

    const {ciudad, pais} = busqueda;

    useEffect(()=>{
        const  consultarAPI = async () =>{
            if (consulta){
                const url = `https://api.openweathermap.org/data/2.5/weather?q=${ciudad},${pais}&appid=${key}`;

                const r = await fetch(url)
                const res = await r.json();
                // console.log(res)
                setResultado(res)
                setCosulta(false)

                if (resultado.cod === "404"){
                    setError(true)
                }
            }
        }
        consultarAPI();
        // eslint-disable-next-line
    },[consulta])

    let componente;
    if (error){
        componente = <Error mensaje="No hay resultados" />
    }
    else{
       componente= <Clima
            resultado={resultado}
        />
    }

  return (
      <Fragment>
          <Header
          titulo="Clima React App"
          />
          <div className="contenedor-form">
              <div className="container">
                  <div className="row">
                      <div className="col m6 s12">
                          <Formulario
                          busqueda={busqueda}
                          setBusqueda={setBusqueda}
                          setConsulta={setCosulta}
                          />
                      </div>
                      <div className="col m6 s12">
                          {componente}
                      </div>
                  </div>
              </div>
          </div>
      </Fragment>
  )
}

export default App;
