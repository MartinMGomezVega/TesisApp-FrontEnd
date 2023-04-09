import React, { useState, useEffect } from 'react';
import { Spinner, ButtonGroup, Button } from 'react-bootstrap';
import { withRouter } from 'react-router-dom';
import queryString from 'query-string';
import { isEmpty } from 'lodash';
import { useDebouncedCallback } from 'use-debounce';
import BasicLayout from '../../layout/BasicLayout';
import ListUsers from '../../components/ListUsers/ListUsers';

import { getFollowAPI } from '../../API/follow';


import "./Users.scss";


function Users(props) {
    const { setRefreshCheckLogin, location, history } = props; // history para actualizar la url
    const [users, setUsers] = useState(null);
    const params = useUsersQuery(location);
    const [typeUser, setTypeUser] = useState(params.type || "follow"); // params.type no tiene valor, por default, va follow

    // Boton de buscar mas usuarios
    const [btnLoading, setBtnLoading] = useState(false);

    // Buscador de usuarios
    const onSearch = useDebouncedCallback((value) => {
        setUsers(null);
        history.push({
            search: queryString.stringify({...params, search: value, page: 1}),
        })
    }, 200);

    // console.log(queryString.stringify(params));

    // Cargar los usuarios nuevos o seguidos
    useEffect(() => {
        getFollowAPI(queryString.stringify(params)) // Parametros dinamicos para cuando se elija entre Siguiendo y Nuevos
            .then(response => {
                // Si es un entero: ==
                // eslint-disable-next-line eqeqeq
                if(params.page == 1){
                    if(isEmpty(response)){
                        setUsers([]); // Vacia los usuarios
                    } else {
                        setUsers(response);
                    }
                } else {
                    // Recargar los usuarios sin eliminar los que ya aparecen.
                    if(!response){
                        // Es nulo o no tiene contenido
                        setBtnLoading(0);
                    } else {
                        // Si tiene valor el response, que muestre los usuarios que ya se ven mas los usuarios nuevos de la siguiente pagina
                        setUsers([...users, ...response]);
                        setBtnLoading(false);
                    }
                }
            }).catch(() => {
                setUsers([]);
            });
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [location]); // se ejecuta cada vez que se cambia location, es decir, la url

    // Cambiar de usuarios siguiendo a usuarios nuevos
    const onChangeType = (type) => {
        setUsers(null);
        if(type === "new") {
            setTypeUser("new")
        } else {
            setTypeUser("follow")
        }

        // Actualizar la URL
        history.push({
            // Inicializando la url
            search: queryString.stringify({ type: type, page: 1, search: ""})
        })
    };

    // Buscar y cargar usuarios
    const moreData = (type) => {
        setBtnLoading(true);
        const newPage = parseInt(params.page) + 1;

        // Cambiar de pagina en la URL
        history.push({
            search: queryString.stringify({...params, page: newPage})
        });
    };

    return (
        <BasicLayout className='users' title="Usuarios" setRefreshCheckLogin={setRefreshCheckLogin}>
            {/* Titulo de la pagina */}
            <div className='users__title'>
                <h2>Usuarios</h2>
                <input type="text" placeholder='Buscar usuario...' 
                onChange={e => onSearch(e.target.value)}
                />
            </div>
            
            {/* Botones de usuarios Siguiendo y usuarios Nuevos */}
            <ButtonGroup className='users__options'>
                <Button className={typeUser === "follow" && "active"} onClick={() => onChangeType("follow")}>Siguiendo</Button>
                <Button className={typeUser === "new" && "active"} onClick={() => onChangeType("new")}>Nuevos</Button>
            </ButtonGroup>

            {/* Carga de usuarios */}
            {!users ? (
                // Si no hay usuarios
                <div className='users__loading'>
                    <Spinner animation='border' variant='info' />
                    Buscando usuarios
                </div>
            ) : (
                <> 
                    {/* Se utiliza el fragment (<> </>)para poder devolver dos o mas objetos */}
                    <ListUsers users={users} />
                    <Button onClick={moreData} className="load-more">
                        {
                            !btnLoading ? (
                                btnLoading !== 0 && "Cargar más usuarios"    
                            ) : (
                                <Spinner as='span' animation='grow' size='sm' role='status' aria-hidden='true' />
                            )
                        }
                    </Button>

                </>
                
            )}

        </BasicLayout>
    );
}

// Obtener la url de /users
function useUsersQuery(location) {
    // page por default es 1, type por default es Follow y search por defualt es vacio
    const { page = 1, type = "follow", search } = queryString.parse(
        location.search
    );

    return { page, type, search };
}

export default withRouter(Users);